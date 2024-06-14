package com.sunflowers.ecommerce.request;

import com.sunflowers.ecommerce.entity.User.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

/**
 * Request class for user registration final form.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompleteRegistrationRequest {
    private String token;
    private String firstName;
    private String lastName;
    private String password;
    private String phone;
}
