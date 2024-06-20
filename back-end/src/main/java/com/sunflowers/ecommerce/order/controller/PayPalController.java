package com.sunflowers.ecommerce.order.controller;

import com.sunflowers.ecommerce.order.data.*;
import com.sunflowers.ecommerce.order.request.GenerateOrderRequest;
import com.sunflowers.ecommerce.order.service.PaypalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/checkout")
public class PayPalController {

    @Autowired
    private PaypalService paypalService;

    @Transactional(rollbackFor = Exception.class)
    @PostMapping("/paypal")
    public ResponseEntity<PaypalOrderResponse> checkout(@RequestBody GenerateOrderRequest request,
            @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        return ResponseEntity.ok(paypalService.createOrder(authorizationHeader, request));
    }

}
