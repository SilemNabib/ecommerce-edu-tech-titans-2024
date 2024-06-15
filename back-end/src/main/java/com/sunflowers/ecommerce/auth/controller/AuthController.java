package com.sunflowers.ecommerce.auth.controller;

import com.sunflowers.ecommerce.auth.request.CompleteRegistrationRequest;
import com.sunflowers.ecommerce.auth.request.VerificationRequest;
import com.sunflowers.ecommerce.auth.response.AuthResponse;
import com.sunflowers.ecommerce.auth.request.LoginRequest;
import com.sunflowers.ecommerce.auth.request.RegisterRequest;
import com.sunflowers.ecommerce.auth.response.ErrorResponse;
import com.sunflowers.ecommerce.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

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
     * This method is transactional, meaning it will roll back the transaction if any exception occurs.
     *
     * @param request the complete registration request containing the user's credentials and additional information
     * @return the authentication response containing the JWT token
     */
    @Transactional(rollbackFor = Exception.class)
    @PostMapping("/complete")
    public ResponseEntity<AuthResponse> completeRegistration(@RequestBody CompleteRegistrationRequest request) {
        return ResponseEntity.ok(authService.completeRegistration(request));
    }

    /**
     * Handles constraint violation exceptions.
     * This method will return a bad request response with an error message.
     *
     * @param e the constraint violation exception
     * @return the error response containing the error message
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException e) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Constraint Violation", e.getMessage()));
    }

    /**
     * Handles authentication exceptions.
     * This method will return an unauthorized response with an error message.
     *
     * @param e the authentication exception
     * @return the error response containing the error message
     */
    @ExceptionHandler({
            AuthenticationServiceException.class,
            DisabledException.class,
            LockedException.class,
            AccountExpiredException.class,
            CredentialsExpiredException.class
    })
    public ResponseEntity<ErrorResponse> handleAuthenticationExceptions(Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Authentication Error", e.getMessage()));
    }

    /**
     * Handles all other exceptions.
     * This method will return an internal server error response with an error message.
     *
     * @param e the exception
     * @return the error response containing the error message
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Internal Server Error", e.getMessage()));
    }
}
