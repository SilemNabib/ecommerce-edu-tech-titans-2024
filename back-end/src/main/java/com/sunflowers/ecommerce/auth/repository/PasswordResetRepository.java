package com.sunflowers.ecommerce.auth.repository;

import com.sunflowers.ecommerce.auth.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PasswordResetRepository extends JpaRepository<PasswordResetToken, UUID> {
    Optional<PasswordResetToken> findById(UUID id);
}
