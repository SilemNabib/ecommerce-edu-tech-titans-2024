package com.sunflowers.ecommerce.request;

import com.sunflowers.ecommerce.entity.User.Role;
import com.sunflowers.ecommerce.entity.User.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Timestamp;

/**
 * Request class for user initial registration (only email is provided until verified).
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String email;
}
