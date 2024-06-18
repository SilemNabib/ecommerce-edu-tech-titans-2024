package com.sunflowers.ecommerce.cart.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * The CartDetailId class represents the composite key for the CartDetail entity.
 * It includes the cart ID and the product ID.
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class CartDetailId {
    private UUID cartId;
    private Long productId;

    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartDetailId that = (CartDetailId) o;
        return this.cartId.equals(that.cartId) && this.productId.equals(that.productId);
    }

    public int hashCode() {
        return this.cartId.hashCode() + this.productId.hashCode();
    }
}
