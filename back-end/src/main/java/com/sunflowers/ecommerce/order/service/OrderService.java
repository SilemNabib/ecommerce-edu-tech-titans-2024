package com.sunflowers.ecommerce.order.service;

import com.sunflowers.ecommerce.auth.config.JwtAuthenticationFilter;
import com.sunflowers.ecommerce.auth.entity.Address;
import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.repository.AddressRepository;
import com.sunflowers.ecommerce.auth.repository.UserRepository;
import com.sunflowers.ecommerce.auth.service.JwtService;
import com.sunflowers.ecommerce.auth.service.UserService;
import com.sunflowers.ecommerce.cart.entity.CartItem;
import com.sunflowers.ecommerce.inventory.entity.Inventory;
import com.sunflowers.ecommerce.inventory.repository.InventoryRepository;
import com.sunflowers.ecommerce.order.entity.Order;
import com.sunflowers.ecommerce.order.entity.OrderDetail;
import com.sunflowers.ecommerce.order.entity.OrderStatus;
import com.sunflowers.ecommerce.order.entity.PaymentMethod;
import com.sunflowers.ecommerce.order.repository.CartItemRepository;
import com.sunflowers.ecommerce.order.repository.OrderRepository;
import com.sunflowers.ecommerce.order.request.GenerateOrderRequest;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.ParameterOutOfBoundsException;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private UserService userService;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private InventoryRepository inventoryRepository;

    public void saveOrder(Order order) {
        orderRepository.save(order);
    }

    public Order createOrder(String authorizationHeader, GenerateOrderRequest request) {
        String token = JwtAuthenticationFilter.getTokenFromHeader(authorizationHeader);

        User user = userService.getUserByEmail(request.getUserEmail());

        if(!jwtService.validateToken(token, user) || !user.getEmail().equalsIgnoreCase(jwtService.extractUsername(token))){
            throw new AuthorizationServiceException("Unauthorized");
        }

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
}

@Builder
class Details {
    List<OrderDetail> items;
    BigDecimal totalPrice;
}