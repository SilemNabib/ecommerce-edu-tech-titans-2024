package com.sunflowers.ecommerce.cart.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddProductToCartRequest {
    private Long inventoryId;
    private Integer amount;
}
