package com.sunflowers.ecommerce.controller;

import com.sunflowers.ecommerce.response.AuthResponse;
import com.sunflowers.ecommerce.request.LoginRequest;
import com.sunflowers.ecommerce.request.RegisterRequest;
import com.sunflowers.ecommerce.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for handling authentication requests.
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Handles login requests.
     *
     * @param loginRequest the login request
     * @return the authentication response containing the JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    /**
     * Handles registration requests.
     *
     * @param registerRequest the registration request
     * @return the authentication response containing the JWT token
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.register(registerRequest));
    }

}
