package com.sunflowers.ecommerce.order.controller;

import com.sunflowers.ecommerce.order.dto.OrderDto;
import com.sunflowers.ecommerce.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/order")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/{state}")
    public ResponseEntity<Page<OrderDto>> getOrders(@RequestParam(name="page", defaultValue = "0") int page, @PathVariable(name = "state") String state) {
        return orderService.getOrders(page, state);
    }

}
