package com.sunflowers.ecommerce.auth.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

/**
 * The PasswordResetToken entity represents a token that is used for password reset operations in the authentication system.
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class PasswordResetToken {

    @Id
    private UUID id;

    private Integer otp;

    private Date expirationTime;

}
