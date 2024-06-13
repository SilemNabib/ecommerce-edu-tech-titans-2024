package com.sunflowers.ecommerce.controller;

import com.sunflowers.ecommerce.request.CompleteRegistrationRequest;
import com.sunflowers.ecommerce.request.VerificationRequest;
import com.sunflowers.ecommerce.response.AuthResponse;
import com.sunflowers.ecommerce.request.LoginRequest;
import com.sunflowers.ecommerce.request.RegisterRequest;
import com.sunflowers.ecommerce.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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
     * This method will take a LoginRequest object and return a JWT token wrapped in an AuthResponse object.
     *
     * @param loginRequest the login request containing the user's credentials
     * @return the authentication response containing the JWT token
     */
    @Transactional(readOnly = true)
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    /**
     * Handles registration requests.
     * This method will take a RegisterRequest object and return a JWT token wrapped in an AuthResponse object.
     * The user will be sent a verification email to verify their email address.
     *
     * @param registerRequest the registration request containing the user's email
     * @return the authentication response containing the JWT token
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.register(registerRequest));
    }

    /**
     * Handles verification requests.
     * This method will take a VerificationRequest object and return a JWT token wrapped in an AuthResponse object.
     * The user will be verified using the verification code sent to their email and the session token given before.
     *
     * @param verifyRequest the verification request containing the verification code
     * @return the authentication response containing the JWT token
     */
    @PostMapping("/verify")
    public ResponseEntity<AuthResponse> verify(@RequestBody VerificationRequest verifyRequest) {
        return ResponseEntity.ok(authService.verify(verifyRequest));
    }

    /**
     * Handles completion of registration requests.
     * This method will take a CompleteRegistrationRequest object and return a JWT token wrapped in an AuthResponse object.
     * This method is transactional, meaning it will rollback the transaction if any exception occurs.
     *
     * @param request the complete registration request containing the user's credentials and additional information
     * @return the authentication response containing the JWT token
     */
    @Transactional(rollbackFor = Exception.class)
    @PostMapping("/complete")
    public ResponseEntity<AuthResponse> completeRegistration(@RequestBody CompleteRegistrationRequest request) {
        return ResponseEntity.ok(authService.completeRegistration(request));
    }
}
