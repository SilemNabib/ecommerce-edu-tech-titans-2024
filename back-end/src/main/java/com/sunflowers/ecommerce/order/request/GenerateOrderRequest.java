package com.sunflowers.ecommerce.order.request;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GenerateOrderRequest {
    String addressId;
    String userEmail;
}
