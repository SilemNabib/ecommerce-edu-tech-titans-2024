package com.sunflowers.ecommerce.auth.service;

import com.sunflowers.ecommerce.auth.entity.Role;
import com.sunflowers.ecommerce.auth.entity.UnverifiedUser;
import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.repository.UnverifiedUserRepository;
import com.sunflowers.ecommerce.auth.repository.UserRepository;
import com.sunflowers.ecommerce.auth.request.CompleteRegistrationRequest;
import com.sunflowers.ecommerce.auth.request.VerificationRequest;
import com.sunflowers.ecommerce.auth.response.AuthResponse;
import com.sunflowers.ecommerce.auth.request.LoginRequest;
import com.sunflowers.ecommerce.auth.request.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.sql.Timestamp;
import java.time.Instant;

/**
 * Service class for handling authentication and user registration.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final EmailService emailService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UnverifiedUserRepository unverifiedUserRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;

    /**
     * Generates a six-digit verification code.
     * This method generates a random six-digit integer and converts it to a string.
     * The generated code is used for user verification purposes.
     *
     * @return a string representation of a six-digit verification code
     */
    private String generateVerificationCode() {
        int code = (int) ((Math.random() * (999999 - 100000)) + 100000);
        return String.valueOf(code);
    }

    private boolean validatePassword(String password) {
        return password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!(){}\\[\\]:;,.?/|<>\\-*])(?=\\S+$).{8,}$");
    }

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
        String token = jwtService.generateToken(user.getUsername());
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    /**
     * Registers a new user and generates a JWT token.
     * This method creates an unverified user entity and generates a verification code.
     * The verification code is sent to the user via email for verification.
     * The user will have 15 minutes to verify their email address and 60 to complete the registration process.
     *
     * @param registerRequest the registration request containing user details
     * @return the authentication response containing the JWT token
     */
    public AuthResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail()))  {
            throw new RuntimeException("Email already registered");
        }

        String token = jwtService.generateToken(registerRequest.getEmail(), Timestamp.from(new Date(System.currentTimeMillis() + 1000 * 60 * 15).toInstant()));

        String verificationCode = generateVerificationCode();

        UnverifiedUser user = UnverifiedUser.builder()
                .authToken(token)
                .email(registerRequest.getEmail())
                .verificationCode(verificationCode)
                .expiration(Timestamp.from(new Date(System.currentTimeMillis() + 1000 * 60 * 60).toInstant()))
                .build();

        unverifiedUserRepository.save(user);

        emailService.setMail(emailService.getMailBuilder()
                .emailVerification(registerRequest.getEmail(), verificationCode));
        emailService.sendEmail();

        //TODO: Send verification email with code

        return AuthResponse.builder()
                .token(token)
                .build();
    }

    /**
     * Verifies the user's email address using the verification code.
     * This method verifies the user's email address by comparing the verification code
     * provided by the user with the verification code stored in the database.
     * If the verification code matches, the user is marked as verified.
     *
     * @param verificationRequest the verification request containing the verification code
     * @return the authentication response containing the JWT token
     */
    public AuthResponse verify(VerificationRequest verificationRequest) {
        UnverifiedUser user = unverifiedUserRepository.findByAuthToken(verificationRequest.getToken())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(jwtService.isTokenExpired(user.getAuthToken())) {
            throw new RuntimeException("Session expired");
        }

        if (user.getVerificationCode().equals(verificationRequest.getVerificationCode())) {
            user.setVerified(true);
            unverifiedUserRepository.save(user);
        } else {
            throw new RuntimeException("Invalid verification code");
        }

        return AuthResponse.builder()
                .token(user.getAuthToken())
                .build();
    }

    /**
     * Completes the registration process for a user.
     * This method completes the registration process for a user by creating a new User entity
     * and deleting the corresponding UnverifiedUser entity.
     *
     * @param registerRequest the registration request containing user details
     * @return the authentication response containing the JWT token
     */
    public AuthResponse completeRegistration(CompleteRegistrationRequest registerRequest) {
        UnverifiedUser unverifiedUser = unverifiedUserRepository.findByAuthToken(registerRequest.getToken())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!unverifiedUser.isVerified()) {
            throw new RuntimeException("User not verified");
        }

        if (!validatePassword(registerRequest.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        User user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(unverifiedUser.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phone(registerRequest.getPhone())
                .registrationDate(Timestamp.from(Instant.now()))
                .role(Role.USER)
                .build();

        userRepository.save(user);
        unverifiedUserRepository.delete(unverifiedUser);

        return AuthResponse.builder()
                .token(jwtService.generateToken(user.getEmail()))
                .build();
    }
}
