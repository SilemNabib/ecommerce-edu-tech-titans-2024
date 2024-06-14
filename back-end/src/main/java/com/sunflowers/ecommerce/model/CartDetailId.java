package com.sunflowers.ecommerce.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CartDetailId implements Serializable {

    private String productId;
    private String cartUserId;

    public CartDetailId(String productId, String cartUserId) {
        this.productId = productId;
        this.cartUserId = cartUserId;
    }

    public CartDetailId() {

    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getCartUserId() {
        return cartUserId;
    }

    public void setCartUserId(String cartUserId) {
        this.cartUserId = cartUserId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartDetailId that = (CartDetailId) o;
        return Objects.equals(productId, that.productId) && Objects.equals(cartUserId, that.cartUserId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, cartUserId);
    }
}

