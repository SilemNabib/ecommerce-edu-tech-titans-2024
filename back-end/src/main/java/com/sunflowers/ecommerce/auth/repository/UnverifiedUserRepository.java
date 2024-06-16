package com.sunflowers.ecommerce.auth.repository;

import com.sunflowers.ecommerce.auth.entity.UnverifiedUser;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * Repository interface for UnverifiedUser entities.
 * This interface extends CrudRepository, providing methods for CRUD operations.
 */
public interface UnverifiedUserRepository extends CrudRepository<UnverifiedUser, Integer> {
    /**
     * Finds an UnverifiedUser entity by its authentication token.
     *
     * @param authToken the authentication token of the unverified user
     * @return an Optional containing the UnverifiedUser entity if found, or an empty Optional if not found
     */
    Optional<UnverifiedUser> findByAuthToken(String authToken);
}
