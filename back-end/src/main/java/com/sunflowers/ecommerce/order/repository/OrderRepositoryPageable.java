package com.sunflowers.ecommerce.order.repository;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.order.entity.Order;
import com.sunflowers.ecommerce.order.entity.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface OrderRepositoryPageable extends PagingAndSortingRepository<Order, UUID> {
    Page<Order> findAllByUser(User user, Pageable pageable);

    Page<Order> findAllByOrderStatus(OrderStatus orderStatus, Pageable pageable);
}
