package com.sunflowers.ecommerce.auth.repository;

import com.sunflowers.ecommerce.auth.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Repository interface for PasswordResetToken entities.
 * This interface extends JpaRepository, providing methods for CRUD operations.
 */
@Repository
public interface PasswordResetRepository extends JpaRepository<PasswordResetToken, UUID> {
}
