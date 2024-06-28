package com.sunflowers.ecommerce.order.repository;

import com.sunflowers.ecommerce.order.entity.OrderDetail;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface OrderDetailRepository extends CrudRepository<OrderDetail, UUID>{
}
