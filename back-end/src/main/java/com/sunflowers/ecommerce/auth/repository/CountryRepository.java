package com.sunflowers.ecommerce.auth.repository;

import com.sunflowers.ecommerce.auth.entity.Country;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Country entities.
 * This interface extends CrudRepository, providing methods for CRUD operations.
 */
@Repository
public interface CountryRepository extends CrudRepository<Country, String> {
}
