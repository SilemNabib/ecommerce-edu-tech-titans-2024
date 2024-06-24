package com.sunflowers.ecommerce.order.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class OrderStatusResponse {
    String status;
    String platformStatus;
    String orderId;
    String paymentId;
}
