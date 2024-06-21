package com.sunflowers.ecommerce.auth.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class PasswordResetToken {

    @Id
    private UUID id;

    @Column(name = "otp", nullable = false)
    private Integer otp;

    @Column(name = "expiration_time", nullable = false)
    private Date expirationTime;

}
