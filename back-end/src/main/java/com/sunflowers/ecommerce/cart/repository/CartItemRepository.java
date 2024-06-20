package com.sunflowers.ecommerce.cart.repository;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.cart.entity.CartItem;
import com.sunflowers.ecommerce.inventory.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository  extends JpaRepository<CartItem, Long> {
    boolean existsByUserAndInventory(User user, Inventory inventory);
}
