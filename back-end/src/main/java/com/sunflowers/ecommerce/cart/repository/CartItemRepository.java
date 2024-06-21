package com.sunflowers.ecommerce.cart.repository;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.cart.dto.UserCartsDto;
import com.sunflowers.ecommerce.cart.entity.CartItem;
import com.sunflowers.ecommerce.inventory.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository  extends JpaRepository<CartItem, Long> {
    boolean existsByUserAndInventory(User user, Inventory inventory);
    Optional<CartItem> findByUserAndInventory(User user, Inventory inventory);

    @Query("SELECT new com.sunflowers.ecommerce.cart.dto.UserCartsDto(ci.id, ci.amount, ci.inventory) FROM CartItem ci WHERE ci.user = ?1")
    List<UserCartsDto> findAllInventoriesFromUser(User user);
}
