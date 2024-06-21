package com.sunflowers.ecommerce.cart.dto;

import com.sunflowers.ecommerce.inventory.entity.Inventory;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserCartsDto {
    private long cartItemId;
    private Integer cartStock;
    private Inventory inventory;
}
