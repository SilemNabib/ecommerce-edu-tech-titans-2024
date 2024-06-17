package com.sunflowers.ecommerce.auth.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
