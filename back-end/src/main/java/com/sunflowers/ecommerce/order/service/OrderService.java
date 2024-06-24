package com.sunflowers.ecommerce.order.service;

import com.sunflowers.ecommerce.order.repository.OrderRepositoryPageable;
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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final AuthService  authService;
    private final OrderRepositoryPageable orderPageableRepository;

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

}
