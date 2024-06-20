package com.sunflowers.ecommerce.order.service;

import com.sunflowers.ecommerce.order.config.PayPalHttpClient;
import com.sunflowers.ecommerce.order.data.*;
import com.sunflowers.ecommerce.order.entity.Order;
import com.sunflowers.ecommerce.order.entity.PaymentMethod;
import com.sunflowers.ecommerce.order.request.GenerateOrderRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PaypalService {

    @Autowired
    private PayPalHttpClient payPalHttpClient;
    @Autowired
    private OrderService orderService;

    public PaypalOrderResponse createOrder(String authToken, GenerateOrderRequest request) throws Exception {
        Order order = orderService.createOrder(authToken, request);

        PaypalOrderResponse orderResponse = payPalHttpClient.createOrder(createOrderRequest(order));

        order.setPlatformId(orderResponse.getId());
        order.setPlatformStatus(orderResponse.getStatus());
        order.setPaymentMethod(PaymentMethod.PAYPAL);

        orderService.saveOrder(order);

        return orderResponse;
    }

    private PaypalOrderRequest createOrderRequest(Order order){
        PayPalAppContext appContext = PayPalAppContext.builder()
                .returnUrl("http://localhost:8080/checkout/success") // TODO: Cambiar a estático
                .cancelUrl("http://localhost:8080/checkout/cancel") // TODO: Cambiar a estático
                .landingPage("NO_PREFERENCE")
                .brandName("Sunflowers")
                .build();

        PurchaseUnit unit = PurchaseUnit.builder()
                .amount(Amount.builder()
                        .currencyCode("USD")
                        .value(order.getTotalPrice().add(order.getShippingPrice()))
                        .build())
                .build();

        return PaypalOrderRequest.builder()
                .purchaseUnits(List.of(unit))
                .intent(PaypalOrderIntent.CAPTURE)
                .applicationContext(appContext)
                .build();
    }
}
