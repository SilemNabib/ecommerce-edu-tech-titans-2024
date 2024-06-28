package com.sunflowers.ecommerce.order.service;

import com.sunflowers.ecommerce.auth.config.JwtAuthenticationFilter;
import com.sunflowers.ecommerce.auth.entity.Address;
import com.sunflowers.ecommerce.auth.repository.AddressRepository;
import com.sunflowers.ecommerce.auth.service.JwtService;
import com.sunflowers.ecommerce.auth.service.UserService;
import com.sunflowers.ecommerce.cart.entity.CartItem;
import com.sunflowers.ecommerce.cart.repository.CartItemRepository;
import com.sunflowers.ecommerce.inventory.dto.InventoryDTO;
import com.sunflowers.ecommerce.inventory.repository.InventoryRepository;
import com.sunflowers.ecommerce.order.entity.OrderDetail;
import com.sunflowers.ecommerce.order.entity.OrderStatus;
import com.sunflowers.ecommerce.order.repository.OrderRepository;
import com.sunflowers.ecommerce.order.repository.OrderRepositoryPageable;
import com.sunflowers.ecommerce.order.request.GenerateOrderRequest;
import lombok.Builder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.service.AuthService;
import com.sunflowers.ecommerce.order.dto.OrderDto;
import com.sunflowers.ecommerce.order.entity.Order;
import com.sunflowers.ecommerce.response.GeneralResponse;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final AuthService  authService;
    private final OrderRepository orderRepository;
    private final UserService userService;
    private final JwtService jwtService;
    private final AddressRepository addressRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderRepositoryPageable orderPageableRepository;
    private final InventoryRepository inventoryRepository;

    public ResponseEntity<GeneralResponse<Page<OrderDto>>> getOrders(String authorizationHeader, int page) {
        User user = authService.validateAuthorization(authorizationHeader);
        Pageable pageable = PageRequest.of(page, 5, Sort.by("creationDate").descending());
        Page<Order> userOrders = orderPageableRepository.findAllByUser(user, pageable);

        // TODO: Preguntar si en terminos de eficiencia este es el aproach mas adecuado
        Page<OrderDto> orderDtoPage = userOrders.map(userOrder -> OrderDto.builder()
                .id(userOrder.getId())
                .address(userOrder.getAddress())
                .paymentMethod(userOrder.getPaymentMethod())
                .creationDate(userOrder.getCreationDate())
                .shippingPrice(userOrder.getShippingPrice())
                .totalPrice(userOrder.getTotalPrice())
                .orderStatus(userOrder.getOrderStatus())
                .inventory(userOrder.getOrderDetails().stream()
                        .map(orderDetail -> new InventoryDTO(orderDetail.getInventory(), orderDetail.getAmount()))
                        .collect(Collectors.toList()))
                .build());

        if (userOrders.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(GeneralResponse.<Page<OrderDto>>builder()
                            .statusCode(HttpStatus.OK.value())
                            .message("The user has no orders at the moment")
                            .success(true)
                            .data(orderDtoPage)
                            .build());
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(GeneralResponse.<Page<OrderDto>>builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("The following user orders were found")
                        .success(true)
                        .data(orderDtoPage)
                        .build());
    }

    public void saveOrder(Order order) {
        orderRepository.save(order);
    }

    public Order createOrder(String authorizationHeader, GenerateOrderRequest request) {
        String token = JwtAuthenticationFilter.getTokenFromHeader(authorizationHeader);

        User user = userService.getUserByEmail(jwtService.extractUsername(token));

        Address address = addressRepository.findById(UUID.fromString(request.getAddressId()))
                .orElseThrow(()-> new IllegalArgumentException("Address not found"));

        if(!user.getAddresses().contains(address)) {
            throw new IllegalArgumentException("Address not related to user");
        }

        List<CartItem> items = cartItemRepository.findAllByUser(user);
        Details details = createOrderDetails(items);
        cartItemRepository.deleteAll(items);

        Order order =  Order.builder()
                .user(user)
                .address(address.getStringAddress())
                .orderStatus(OrderStatus.PENDING)
                .creationDate(new Timestamp(System.currentTimeMillis()))
                .totalPrice(details.totalPrice)
                .shippingPrice(BigDecimal.ZERO)
                .build();

        order = orderRepository.save(order);

        for (OrderDetail detail : details.items) {
            detail.setOrder(order);
        }

        order.setOrderDetails(details.items);

        return order;
    }

    /**
     * Create order details from cart items
     * Validates stock and calculates total price
     *
     * @param items List of cart items
     * @return Details object with order details and total price
     */
    private Details createOrderDetails(List<CartItem> items){

        List<OrderDetail> details = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (CartItem item : items) {

            if(item.getInventory().getStock() < item.getAmount()) {
                throw new IllegalArgumentException("Not enough stock");
            }

            details.add(OrderDetail.builder()
                    .inventory(item.getInventory())
                    .amount(item.getAmount())
                    .unitPrice(item.getInventory().getProduct().getPrice())
                    .build()
            );

            item.getInventory().setStock(item.getInventory().getStock() - item.getAmount());
            inventoryRepository.save(item.getInventory());

            total = total.add(
                    BigDecimal.valueOf(item.getAmount())
                            .multiply(item.getInventory().getProduct().getPrice())
            );
        }
        return Details.builder()
                .items(details)
                .totalPrice(total)
                .build();
    }

    public Order getOrderById(String orderId) {
        return orderRepository.findById(UUID.fromString(orderId))
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
    }

    public ResponseEntity<GeneralResponse<Page<OrderDto>>> getMyOrders(String authorizationHeader, int page) {
        User user = authService.validateAuthorization(authorizationHeader);
        Pageable pageable = PageRequest.of(page, 5, Sort.by("creationDate").descending());
        Page<Order> userOrders = orderPageableRepository.findAllByUser(user, pageable);

        Page<OrderDto> orderDtoPage = userOrders.map(userOrder -> OrderDto.builder()
                .id(userOrder.getId())
                .address(userOrder.getAddress())
                .paymentMethod(userOrder.getPaymentMethod())
                .creationDate(userOrder.getCreationDate())
                .shippingPrice(userOrder.getShippingPrice())
                .totalPrice(userOrder.getTotalPrice())
                .orderStatus(userOrder.getOrderStatus())
                .inventory(userOrder.getOrderDetails().stream()
                        .map(orderDetail -> new InventoryDTO(orderDetail.getInventory(), orderDetail.getAmount()))
                        .collect(Collectors.toList()))
                .build());

        if (userOrders.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(GeneralResponse.<Page<OrderDto>>builder()
                            .statusCode(HttpStatus.OK.value())
                            .message("The user has no orders at the moment")
                            .success(true)
                            .data(orderDtoPage)
                            .build());
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(GeneralResponse.<Page<OrderDto>>builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("The following user orders were found")
                        .success(true)
                        .data(orderDtoPage)
                        .build());
    }

    public ResponseEntity<Page<OrderDto>> getOrders(int page, String state) {
        Pageable pageable = PageRequest.of(page, 5, Sort.by("creationDate").descending());
        Page<Order> orders = orderPageableRepository.findAllByOrderStatus(OrderStatus.valueOf(state), pageable);

        Page<OrderDto> orderDtoPage = orders.map(order -> OrderDto.builder()
                .id(order.getId())
                .address(order.getAddress())
                .paymentMethod(order.getPaymentMethod())
                .creationDate(order.getCreationDate())
                .shippingPrice(order.getShippingPrice())
                .totalPrice(order.getTotalPrice())
                .orderStatus(order.getOrderStatus())
                .inventory(order.getOrderDetails().stream()
                        .map(orderDetail -> new InventoryDTO(orderDetail.getInventory(), orderDetail.getAmount()))
                        .collect(Collectors.toList()))
                .build());

        return ResponseEntity.ok(orderDtoPage);
    }
}

@Builder
class Details {
    List<OrderDetail> items;
    BigDecimal totalPrice;
}
