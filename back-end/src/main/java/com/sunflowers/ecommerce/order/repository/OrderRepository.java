package com.sunflowers.ecommerce.order.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.order.entity.Order;

@Repository
public interface OrderRepository extends CrudRepository<Order, UUID>{

}
