package com.sunflowers.ecommerce.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_detail")
public class CartDetail {

    @EmbeddedId
    private CartDetailId id;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToOne
    @MapsId("cartUserId")
    @JoinColumn(name = "cart_user_id")
    private Cart cart;

    @Column(name = "amount", nullable = false)
    private int amount;

    public CartDetailId getId() {
        return id;
    }

    public void setId(CartDetailId id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
