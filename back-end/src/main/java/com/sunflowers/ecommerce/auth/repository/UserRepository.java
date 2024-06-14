package com.sunflowers.ecommerce.auth.repository;

import com.sunflowers.ecommerce.auth.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for performing CRUD operations on User entities.
 */
@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    /**
     * Finds a user by their email.
     *
     * @param email the email of the user
     * @return an optional containing the user if found, or empty if not found
     */
    Optional<User> findByEmail(String email);
}

