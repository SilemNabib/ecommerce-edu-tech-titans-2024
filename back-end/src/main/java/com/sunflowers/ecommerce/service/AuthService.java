package com.sunflowers.ecommerce.service;

import com.sunflowers.ecommerce.entity.User.Role;
import com.sunflowers.ecommerce.entity.User.User;
import com.sunflowers.ecommerce.repository.UserRepository;
import com.sunflowers.ecommerce.response.AuthResponse;
import com.sunflowers.ecommerce.request.LoginRequest;
import com.sunflowers.ecommerce.request.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;

/**
 * Service class for handling authentication and user registration.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;

    /**
     * Authenticates a user and generates a JWT token.
     *
     * @param loginRequest the login request containing email and password
     * @return the authentication response containing the JWT token
     */
    public AuthResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        UserDetails user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        String token = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    /**
     * Registers a new user and generates a JWT token.
     *
     * @param registerRequest the registration request containing user details
     * @return the authentication response containing the JWT token
     */
    public AuthResponse register(RegisterRequest registerRequest) {
        User user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phone(registerRequest.getPhone())
                .registrationDate(new Date(System.currentTimeMillis()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        return AuthResponse.builder()
                .token(jwtService.generateToken(user))
                .build();
    }
}
