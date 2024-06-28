package com.sunflowers.ecommerce.order.controller;

import com.sunflowers.ecommerce.order.dto.OrderDto;
import com.sunflowers.ecommerce.order.entity.Order;
import com.sunflowers.ecommerce.order.service.OrderService;
import com.sunflowers.ecommerce.response.GeneralResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/order")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/history")
    public ResponseEntity<GeneralResponse<Page<OrderDto>>> getMyOrders(@RequestHeader(name = "Authorization") String authorizationHeader, @RequestParam(name="page", defaultValue = "0") int page) {
        return orderService.getMyOrders(authorizationHeader, page);
    }

    @ExceptionHandler
    public ResponseEntity<GeneralResponse<String>> handleException(Exception e) {
        return ResponseEntity.status(500)
                .body(GeneralResponse.<String>builder()
                        .statusCode(500)
                        .message(e.getMessage())
                        .success(false)
                        .data(null)
                        .build());
    }
}
