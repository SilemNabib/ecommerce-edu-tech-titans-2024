package com.sunflowers.ecommerce.inventory.dto;

import com.sunflowers.ecommerce.inventory.entity.Color;
import com.sunflowers.ecommerce.inventory.entity.Inventory;
import com.sunflowers.ecommerce.product.dto.SimpleProductDTO;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class InventoryDTO {
    private Long id;
    private SimpleProductDTO product;
    private Color color;
    private String size;
    private Integer stock;
    private Integer amount;

    public InventoryDTO(Inventory inventory) {
        this.id = inventory.getId();
        this.color = inventory.getColor();
        this.size = inventory.getSize();
        this.stock = inventory.getStock();
        this.product = new SimpleProductDTO(inventory.getProduct());
    }

    public InventoryDTO(Inventory inventory, int amount) {
        this.id = inventory.getId();
        this.color = inventory.getColor();
        this.size = inventory.getSize();
        this.stock = inventory.getStock();
        this.product = new SimpleProductDTO(inventory.getProduct());
        this.amount = amount;
    }
}
