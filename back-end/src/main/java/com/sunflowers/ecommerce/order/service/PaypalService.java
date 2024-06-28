package com.sunflowers.ecommerce.order.service;

import com.sunflowers.ecommerce.auth.config.JwtAuthenticationFilter;
import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.service.JwtService;
import com.sunflowers.ecommerce.auth.service.UserService;
import com.sunflowers.ecommerce.email.EmailService;
import com.sunflowers.ecommerce.email.MailBody;
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
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaypalService {

    private final PayPalHttpClient payPalHttpClient;
    private final OrderService orderService;
    private final UserService userService;
    private final JwtService jwtService;
    private final EmailService emailService;

    public PaypalOrderResponse createOrder(String authToken, GenerateOrderRequest request) throws Exception {
        Order order = orderService.createOrder(authToken, request);
        User user = userService.getUserByEmail(jwtService.extractUsername(authToken));

        PaypalOrderResponse orderResponse = payPalHttpClient.createOrder(createOrderRequest(order));

        order.setPlatformId(orderResponse.getId());
        order.setPlatformStatus(orderResponse.getStatus());
        order.setPaymentMethod(PaymentMethod.PAYPAL);

        orderService.saveOrder(order);

        String orderDetails = "Order ID: " + order.getId() + "\n"
                + "Order Status: pending payment confirmation" + "\n"
                + "Order Total: " + order.getTotalPrice() + "\n"
                + "Shipping Price: " + order.getShippingPrice() + "\n"
                + "Payment Method: " + order.getPaymentMethod();

        MailBody mail = MailBody.builder()
                .to(user.getEmail())
                .subject("Order Payment Status")
                .text("Your order status is PENDING"  + ". Here are the details of your order:\n\n" + orderDetails)
                .build();

        emailService.sendEmail(mail);

        orderResponse.setOrderId(order.getId().toString());

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


        if (order.getPlatformStatus().equals("CREATED")) {
            PaypalCaptureResponse captureResponse = payPalHttpClient.captureOrder(order.getPlatformId());

            String newPlatformStatus = captureResponse.getStatus();
            OrderStatus newOrderStatus = mapPaypalStatusToOrderStatus(newPlatformStatus);

            order.setOrderStatus(newOrderStatus);
            order.setPlatformStatus(newPlatformStatus);

            try {
                orderService.saveOrder(order);
            } catch (DataIntegrityViolationException e) {
                throw new RuntimeException("Failed to save order due to invalid status", e);
            }

            String orderDetails = "Order ID: " + order.getId() + "\n"
                    + "Order Status: " + newOrderStatus.name() + "\n"
                    + "Order Total: " + order.getTotalPrice() + "\n"
                    + "Shipping Price: " + order.getShippingPrice() + "\n"
                    + "Payment Method: " + order.getPaymentMethod();

            MailBody mail = MailBody.builder()
                    .to(user.getEmail())
                    .subject("Order Payment Status")
                    .text("Your order status is " + newOrderStatus.name() + ". Here are the details of your order:\n\n" + orderDetails)
                    .build();

            emailService.sendEmail(mail);

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

    private OrderStatus mapPaypalStatusToOrderStatus(String paypalStatus) {
        return switch (paypalStatus) {
            case "COMPLETED" -> OrderStatus.PAID;
            case "PENDING" -> OrderStatus.PENDING;
            case "FAILED" -> OrderStatus.FAILED;
            case "CANCELLED" -> OrderStatus.CANCELLED;
            case "REFUNDED" -> OrderStatus.REFUNDED;
            default -> throw new IllegalArgumentException("Invalid PayPal status: " + paypalStatus);
        };
    }

}
