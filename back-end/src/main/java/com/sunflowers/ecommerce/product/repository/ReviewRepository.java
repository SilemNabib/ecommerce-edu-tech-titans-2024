package com.sunflowers.ecommerce.product.repository;

import com.sunflowers.ecommerce.product.entity.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReviewRepository extends CrudRepository<Review, UUID> {
    Iterable<Review> findAllByProductId(Long id);
}
