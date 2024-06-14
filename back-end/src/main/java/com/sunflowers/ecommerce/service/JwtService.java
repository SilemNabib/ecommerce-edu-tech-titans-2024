package com.sunflowers.ecommerce.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

/**
 * Service class for handling JWT operations such as token generation and validation.
 */
@Service
public class JwtService {
    private static final String SECRET_KEY = "218347589736298752039487602734981264523184751092651079456101123641";

    /**
     * Generates a JWT token for the given user with a default expiration date of 24 hours.
     *
     * @param username the username to be included in the token
     * @return the generated JWT token
     */
    public String generateToken(String username) {
        return getToken(new HashMap<>(), username, new java.util.Date(System.currentTimeMillis() + 1000 * 60 * 24));
    }

    /**
     * Generates a JWT token for the given user with the given expiration date.
     *
     * @param username the username to be included in the token
     * @param expirationDate the expiration date of the token
     * @return the generated JWT token
     */
    public String generateToken(String username, Date expirationDate) {
        return getToken(new HashMap<>(), username, expirationDate);
    }

    /**
     * Generates a JWT token with the given claims and user details.
     *
     * @param claims       the claims to be included in the token
     * @param username  the user details to be included in the token
     * @param expirationDate the expiration date of the token
     * @return the generated JWT token
     */
    private String getToken(HashMap<String, Object> claims, String username, Date expirationDate) {
        return Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt(new java.util.Date(System.currentTimeMillis()))
                .expiration(expirationDate)
                .signWith(getKey())
                .compact();
    }

    /**
     * Retrieves the secret key used for signing the JWT token.
     *
     * @return the secret key
     */
    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Extracts the username from the given JWT token.
     *
     * @param token the JWT token
     * @return the username
     */
    public String extractUsername(String token) {
        return getClaim(token, Claims::getSubject);
    }

    /**
     * Validates the JWT token against the user details.
     *
     * @param token       the JWT token
     * @param userDetails the user details
     * @return true if the token is valid, false otherwise
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * Extracts all claims from the given JWT token.
     *
     * @param token the JWT token
     * @return the claims
     */
    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Retrieves a specific claim from the given JWT token.
     *
     * @param token          the JWT token
     * @param ClaimsResolver the function to retrieve the claim
     * @param <T>            the type of the claim
     * @return the claim
     */
    public <T> T getClaim(String token, Function<Claims,T> ClaimsResolver) {
        final Claims claims = extractAllClaims(token);
        return ClaimsResolver.apply(claims);
    }

    /**
     * Retrieves the expiration date from the given JWT token.
     *
     * @param token the JWT token
     * @return the expiration date
     */
    private Date getExpirationDateFromToken(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    /**
     * Checks if the given JWT token is expired.
     *
     * @param token the JWT token
     * @return true if the token is expired, false otherwise
     */
    public boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
}
