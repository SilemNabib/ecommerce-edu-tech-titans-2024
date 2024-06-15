package com.sunflowers.ecommerce.auth.repository;

import com.sunflowers.ecommerce.auth.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PasswordResetRepository extends JpaRepository<PasswordResetToken, UUID> {
}
