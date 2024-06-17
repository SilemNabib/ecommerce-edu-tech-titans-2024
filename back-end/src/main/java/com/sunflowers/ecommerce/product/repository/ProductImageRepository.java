package com.sunflowers.ecommerce.product.repository;

import com.sunflowers.ecommerce.product.entity.ProductImage;
import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repository interface for performing CRUD operations on ProductImage entities.
 */
@Repository
public interface ProductImageRepository extends CrudRepository<ProductImage, UUID> {

    /**
     * Finds a ProductImage entity by its UUID.
     *
     * @param uuid the UUID of the product image
     * @return an Optional containing the ProductImage entity if found, or an empty Optional if not found
     */
    @NonNull
    Optional<ProductImage> findById(@NonNull UUID uuid);
}
