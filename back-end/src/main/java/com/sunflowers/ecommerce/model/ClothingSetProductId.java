package com.sunflowers.ecommerce.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ClothingSetProductId implements Serializable {

    private String clothingSetId;
    private String productId;

    public ClothingSetProductId(String clothingSetId, String productId) {
        this.clothingSetId = clothingSetId;
        this.productId = productId;
    }

    public ClothingSetProductId() {}

    public String getClothingSetId() {
        return clothingSetId;
    }

    public void setClothingSetId(String clothingSetId) {
        this.clothingSetId = clothingSetId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClothingSetProductId that = (ClothingSetProductId) o;
        return Objects.equals(clothingSetId, that.clothingSetId) && Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(clothingSetId, productId);
    }
}

