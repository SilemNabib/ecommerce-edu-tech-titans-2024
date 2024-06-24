package com.sunflowers.ecommerce.cart.dto;

import com.sunflowers.ecommerce.inventory.dto.InventoryDTO;
import com.sunflowers.ecommerce.inventory.entity.Inventory;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class UserCartsDto {
    private long cartItemId;
    private Integer cartStock;
    private InventoryDTO inventory;

    public UserCartsDto(long cartItemId, Integer cartStock, Inventory inventory) {
        this.cartItemId = cartItemId;
        this.cartStock = cartStock;
        this.inventory = new InventoryDTO(inventory); // Conversion de Inventory a InventoryDTO
    }
}
