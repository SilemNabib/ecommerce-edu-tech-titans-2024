package com.sunflowers.ecommerce.order.repository;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.order.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface OrderRepository extends PagingAndSortingRepository<Order, UUID> {
    Page<Order> findAllByUser(User user, Pageable pageable);
}