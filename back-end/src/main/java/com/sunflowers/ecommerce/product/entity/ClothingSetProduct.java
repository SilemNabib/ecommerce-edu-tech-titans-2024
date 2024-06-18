package com.sunflowers.ecommerce.product.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity class for the ClothingSetProduct.
 * This class represents a product associated with a clothing set.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "clothing_set_product")
public class ClothingSetProduct {

    @EmbeddedId
    private ClothingSetProductId id;

    @ManyToOne
    @MapsId("clothingSetId")
    @JoinColumn(name = "clothing_set_id")
    private ClothingSet clothingSet;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

}
