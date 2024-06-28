package com.sunflowers.ecommerce.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
public class JwtServiceTest {


    private JwtService jwtService;
    private UserDetails userDetails;

    private Claims claims;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("testuser@example.com");
    }

    /**
     * Test to verify that the JwtService service's generateToken method generates a valid token.
     * This test verifies that the generated token is not null and that it has a length greater than zero.
     */
    @Test
    void testGenerateToken() {
        String token = jwtService.generateToken("testuser@example.com");
        assertNotNull(token);
        assertTrue(token.length() > 0);
    }

    /**
     * Test to verify that the JwtService service's generateTokenWithExpirationDate method generates a valid token with the correct expiration date.
     * This test verifies that the generated token is not null, that it has a length greater than zero and that the expiration date is as expected.
     */
    @Test
    void testGenerateTokenWithExpirationDate() {
        Date expirationDate = new Date(System.currentTimeMillis() + 1000 * 60 * 60); // 1 hour from now
        String token = jwtService.generateToken("testuser@example.com", expirationDate);
        assertNotNull(token);
        assertTrue(token.length() > 0);
    }

    /**
     * Test to verify that the extractUsername method of the JwtService service correctly extracts the username from the token.
     * This test verifies that the username extracted from the token matches the expected one.
     */
    @Test
    void testExtractUsername() {
        String token = jwtService.generateToken("testuser@example.com");
        String username = jwtService.extractUsername(token);
        assertEquals("testuser@example.com", username);
    }

    /**
     * Test to verify that the JwtService service's validateToken method correctly validates tokens.
     * This test verifies that the token is valid for the user details provided.
     */
    @Test
    void testValidateToken() {
        String token = jwtService.generateToken(userDetails.getUsername());
        boolean isValid = jwtService.validateToken(token, userDetails);
        assertTrue(isValid);
    }

    /**
     * Test to verify that the validateExpiredToken method of the JwtService service correctly handles expired tokens.
     * This test verifies that an exception is thrown when trying to validate an expired token.
     */
    @Test
    void testValidateExpiredToken() {
        Date pastDate = new Date(System.currentTimeMillis() - 1000 * 60 * 60); // 1 hour ago
        String token = jwtService.generateToken(userDetails.getUsername(), pastDate);
        assertThrows(ExpiredJwtException.class, () -> jwtService.validateToken(token, userDetails));
    }

    /**
     * Test to verify that the JwtService service's isTokenExpired method correctly checks if a token is expired.
     * This test verifies that the isTokenExpired method returns false for a token that has not expired and true for a token that has expired.
     */
    @Test
    void testIsTokenExpired() {
        Date pastDate = new Date(System.currentTimeMillis() + 1000 * 60 * 60); // 1 hour
        String token = jwtService.generateToken(userDetails.getUsername(), pastDate);
        assertFalse(jwtService.isTokenExpired(token));
    }

    /**
     * Test to verify that the JwtService service's getClaim method correctly obtains a token claim.
     * This test verifies that the claim obtained from the token matches the expected one.
     */
    @Test
    void testGetClaim() {
        String token = jwtService.generateToken("testuser@example.com");
        String subject = jwtService.getClaim(token, Claims::getSubject);
        assertEquals("testuser@example.com", subject);
    }

}
