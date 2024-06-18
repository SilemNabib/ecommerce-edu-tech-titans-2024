package com.sunflowers.ecommerce.inventory.entity;

import com.sunflowers.ecommerce.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Inventory entity represents the stock status of a specific product variant in the e-commerce system.
 * It encapsulates details such as the product, its color, and the quantity available in stock.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "inventory")
public class Inventory {

    @EmbeddedId
    private InventoryId id;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @MapsId("colorId")
    @JoinColumn(name = "color_id")
    private Color color;

    @Column(name = "stock", nullable = false)
    private int stock;

}