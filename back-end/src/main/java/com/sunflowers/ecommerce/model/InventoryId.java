package com.sunflowers.ecommerce.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class InventoryId implements Serializable {

    private Long productId;
    private String colorId;
    private String size;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InventoryId that = (InventoryId) o;
        return Objects.equals(productId, that.productId) && Objects.equals(colorId, that.colorId) && Objects.equals(size, that.size);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, colorId, size);
    }
}