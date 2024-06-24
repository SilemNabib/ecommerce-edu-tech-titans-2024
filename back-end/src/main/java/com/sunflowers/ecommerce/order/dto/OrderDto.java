package com.sunflowers.ecommerce.order.dto;

import com.sunflowers.ecommerce.order.entity.OrderDetail;
import com.sunflowers.ecommerce.order.entity.OrderStatus;
import com.sunflowers.ecommerce.order.entity.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;
import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
public class OrderDto {
    private UUID id;
    private String address;
    private PaymentMethod paymentMethod;
    private Timestamp creationDate;
    private BigDecimal shippingPrice;
    private BigDecimal totalPrice;
    private OrderStatus orderStatus;
}
