package com.sunflowers.ecommerce.auth.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

/**
 * Entity class representing an unverified user in the system.
 * An unverified user is a user who has registered but not yet verified their email address.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "unverified_users")
public class UnverifiedUser {

    /**
     * The authentication token of the unverified user.
     * This token is used to authenticate the user during the email verification process.
     */
    @Id
    @Column(name = "auth_token")
    private String authToken;

    /**
     * The email address of the unverified user.
     * This email address is used to send the verification email.
     */
    @Email
    @Column(nullable = false)
    private String email;

    /**
     * The verification code sent to the unverified user's email address.
     * This code is used to verify the user's email address.
     */
    @Column(name = "verification_code")
    private String verificationCode;

    /**
     * A flag indicating whether the unverified user has verified their email address.
     * This flag will be set to true when the user verifies their email address but not completed the registration.
     */
    @Column(nullable = false)
    private boolean verified;

    /**
     * The expiration date of the verification code.
     * If the user does not verify their email address before this date, the table register will be deleted.
     */
    @Column(name = "expiration_date", nullable = false)
    private Timestamp expiration;
}
