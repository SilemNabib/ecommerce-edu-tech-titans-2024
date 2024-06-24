package com.sunflowers.ecommerce.order.service;

import com.sunflowers.ecommerce.auth.config.JwtAuthenticationFilter;
import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.service.JwtService;
import com.sunflowers.ecommerce.auth.service.UserService;
import com.sunflowers.ecommerce.order.config.PayPalHttpClient;
import com.sunflowers.ecommerce.order.data.*;
import com.sunflowers.ecommerce.order.entity.Order;
import com.sunflowers.ecommerce.order.entity.OrderStatus;
import com.sunflowers.ecommerce.order.entity.PaymentMethod;
import com.sunflowers.ecommerce.order.request.GenerateOrderRequest;
import com.sunflowers.ecommerce.order.response.OrderStatusResponse;
import com.sunflowers.ecommerce.order.response.PaypalCaptureResponse;
import com.sunflowers.ecommerce.order.response.PaypalOrderResponse;
import com.sunflowers.ecommerce.utils.FrontLinks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaypalService {

    @Autowired
    private PayPalHttpClient payPalHttpClient;
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;

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
                .returnUrl(FrontLinks.PAYPAL_RETURN + "?order=" + order.getId())
                .cancelUrl(FrontLinks.PAYPAL_RETURN + "?order=" + order.getId())
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

    public OrderStatusResponse captureOrder(String orderId, String authToken) throws Exception {
        Order order = orderService.getOrderById(orderId);

        String token = JwtAuthenticationFilter.getTokenFromHeader(authToken);

        User user = userService.getUserByEmail(jwtService.extractUsername(token));

        if(!order.getUser().getId().equals(user.getId())){
            throw new IllegalArgumentException("Order not related to user");
        }


        if(order.getPlatformStatus().equals("CREATED")){
            PaypalCaptureResponse captureResponse = payPalHttpClient.captureOrder(order.getPlatformId());

            order.setOrderStatus(OrderStatus.PAID);
            order.setPlatformStatus(captureResponse.getStatus());

            orderService.saveOrder(order);

            return OrderStatusResponse.builder()
                    .status(order.getOrderStatus().name())
                    .platformStatus(order.getPlatformStatus())
                    .orderId(order.getId().toString())
                    .paymentId(order.getPlatformId())
                    .build();
        }

        return OrderStatusResponse.builder()
                .status(order.getOrderStatus().name())
                .platformStatus(order.getPlatformStatus())
                .orderId(order.getId().toString())
                .paymentId(order.getPlatformId())
                .build();
    }
}
