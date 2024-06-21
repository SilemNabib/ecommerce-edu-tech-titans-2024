package com.sunflowers.ecommerce.order.controller;

import com.sunflowers.ecommerce.order.request.GenerateOrderRequest;
import com.sunflowers.ecommerce.order.response.OrderStatusResponse;
import com.sunflowers.ecommerce.order.response.PaypalOrderResponse;
import com.sunflowers.ecommerce.order.service.PaypalService;
import com.sunflowers.ecommerce.response.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<GeneralResponse<PaypalOrderResponse>> checkout(@RequestBody GenerateOrderRequest request,
                                                                         @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        PaypalOrderResponse paypalResponse = paypalService.createOrder(authorizationHeader, request);

        return ResponseEntity.ok(GeneralResponse.<PaypalOrderResponse>builder()
                .statusCode(HttpStatus.OK.value())
                .success(true)
                .message("Order created successfully")
                .data(paypalResponse)
                .build());
    }

    @GetMapping("/checkout/status")
    public ResponseEntity<OrderStatusResponse> captureOrderStatus(@RequestParam(value = "order") String orderId, @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        return ResponseEntity.ok(paypalService.captureOrder(orderId, authorizationHeader));
    }

    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<GeneralResponse<Void>> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(GeneralResponse.<Void>builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(e.getMessage())
                .success(false)
                .build());
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<GeneralResponse<Void>> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(GeneralResponse.<Void>builder()
                .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message(e.getMessage())
                .success(false)
                .build());
    }
}
