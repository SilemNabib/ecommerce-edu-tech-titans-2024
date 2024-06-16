package com.sunflowers.ecommerce.product.repository;

import com.sunflowers.ecommerce.product.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BannerRepository extends JpaRepository<Banner, UUID> {

}
