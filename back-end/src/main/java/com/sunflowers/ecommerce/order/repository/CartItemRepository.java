package com.sunflowers.ecommerce.order.repository;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.cart.entity.CartItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CartItemRepository extends CrudRepository<CartItem, Long> {

    List<CartItem> findAllByUser(User user);
}
