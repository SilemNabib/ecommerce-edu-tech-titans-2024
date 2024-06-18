package com.sunflowers.ecommerce.auth.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * The ErrorResponse class represents a standard structure for error responses in the authentication system.
 */
@Getter
@Setter
@AllArgsConstructor
public class ErrorResponse {
    private String message;
    private String details;

}
