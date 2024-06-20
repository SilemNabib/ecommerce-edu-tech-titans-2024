package com.sunflowers.ecommerce.order.repository;

import com.sunflowers.ecommerce.order.entity.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderRepository extends CrudRepository<Order, UUID>{

}
