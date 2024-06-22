package com.sunflowers.ecommerce.auth.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PasswordResetToken {

    @Id
    private UUID id;

    private Integer otp;

    private Date expirationTime;

}
