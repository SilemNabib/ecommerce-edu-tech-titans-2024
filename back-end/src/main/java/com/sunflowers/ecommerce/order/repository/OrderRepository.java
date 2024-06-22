package com.sunflowers.ecommerce.order.repository;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.order.entity.Order;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface OrderRepository  extends CrudRepository<Order, UUID> {
}
