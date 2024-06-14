package com.sunflowers.ecommerce.auth.controller;

import com.sunflowers.ecommerce.auth.request.CompleteRegistrationRequest;
import com.sunflowers.ecommerce.auth.request.VerificationRequest;
import com.sunflowers.ecommerce.auth.response.AuthResponse;
import com.sunflowers.ecommerce.auth.request.LoginRequest;
import com.sunflowers.ecommerce.auth.request.RegisterRequest;
import com.sunflowers.ecommerce.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
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
        try {
            return ResponseEntity.ok(authService.login(loginRequest));
        } catch (ConstraintViolationException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }catch (AuthenticationServiceException | DisabledException | LockedException | AccountExpiredException |
                CredentialsExpiredException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
        try {
            return ResponseEntity.ok(authService.register(registerRequest));
        } catch (ConstraintViolationException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }  catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
        try {
            return ResponseEntity.ok(authService.verify(verifyRequest));
        } catch (ConstraintViolationException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
        try {
            return ResponseEntity.ok(authService.completeRegistration(request));
        } catch (ConstraintViolationException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
