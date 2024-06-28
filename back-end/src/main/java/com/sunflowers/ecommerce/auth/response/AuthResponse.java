package com.sunflowers.ecommerce.auth.response;

import com.sunflowers.ecommerce.auth.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.converter.json.MappingJacksonValue;

/**
 * Response class for authentication, containing the JWT token.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    String token;
     User user;
}
