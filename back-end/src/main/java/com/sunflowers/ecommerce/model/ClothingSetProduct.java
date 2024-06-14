package com.sunflowers.ecommerce.model;

import jakarta.persistence.*;

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

    public ClothingSetProductId getId() {
        return id;
    }

    public void setId(ClothingSetProductId id) {
        this.id = id;
    }

    public ClothingSet getClothingSet() {
        return clothingSet;
    }

    public void setClothingSet(ClothingSet clothingSet) {
        this.clothingSet = clothingSet;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
