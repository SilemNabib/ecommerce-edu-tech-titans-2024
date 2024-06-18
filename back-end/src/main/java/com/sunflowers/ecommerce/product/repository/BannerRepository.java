package com.sunflowers.ecommerce.product.repository;

import com.sunflowers.ecommerce.product.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * Repository interface for the Banner entity.
 * This interface allows CRUD operations on the Banner entity.
 */
public interface BannerRepository extends JpaRepository<Banner, UUID> {

}
