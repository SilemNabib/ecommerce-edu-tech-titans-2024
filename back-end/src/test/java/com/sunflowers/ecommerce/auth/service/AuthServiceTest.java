package com.sunflowers.ecommerce.auth.service;


import com.sunflowers.ecommerce.auth.entity.UnverifiedUser;
import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.repository.UnverifiedUserRepository;
import com.sunflowers.ecommerce.auth.repository.UserRepository;
import com.sunflowers.ecommerce.auth.request.CompleteRegistrationRequest;
import com.sunflowers.ecommerce.auth.request.LoginRequest;
import com.sunflowers.ecommerce.auth.request.RegisterRequest;
import com.sunflowers.ecommerce.auth.request.VerificationRequest;
import com.sunflowers.ecommerce.auth.response.AuthResponse;
import com.sunflowers.ecommerce.email.EmailService;

import com.sunflowers.ecommerce.email.MailBody;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UnverifiedUserRepository unverifiedUserRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private AuthService authService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        user = new User();

        user.setId(UUID.randomUUID());
        user.setEmail("test@gmail.com");
        user.setFirstName("Tester");
        user.setLastName("Test");
        user.setPassword("MyPassword123");
        user.setPhone("1000000000");
    }

    /**
     * Test to verify that the AuthService service's login method returns the correct token.
     * This test simulates a successful login and verifies that the returned token is not null and matches what is expected.
     */
    @Test
    void testLogin() {
        // Arrange
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@gmail.com");
        loginRequest.setPassword("MyPassword123");

        // We simulate the behavior of the 'findByEmail' method of the UserRepository repository.
        // When the 'findByEmail' method is called with "test@gmail.com" as an argument, an Optional with a User object is returned.
        when(userRepository.findByEmail("test@gmail.com")).thenReturn(Optional.of(user));

        // We simulate the behavior of the 'authenticate' method of the AuthenticationManager.
        // When the 'authenticate' method is called with a UsernamePasswordAuthenticationToken object containing "test@gmail.com" and "MyPassword123" as arguments, null is returned.
        when(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()))).thenReturn(null);

        // We simulate the behavior of the 'generateToken' method of the JwtService service.
        // When the 'generateToken' method is called with "test@gmail.com" as an argument, "token" is returned.
        when(jwtService.generateToken(user.getEmail())).thenReturn("token");

        // Act
        AuthResponse response = authService.login(loginRequest);

        // Assert
        assertNotNull(response);
        assertEquals("token", response.getToken());
    }

    /**
     * Test to verify that the AuthService service's generateVerificationCode method generates a valid verification code.
     * This test verifies that the verification code generated is a six-digit number.
     */
    @Test
    void testGenerateVerificationCode() {
        // Act
        String code = authService.generateVerificationCode();

        // Assert
        assertNotNull(code);
        assertTrue(code.matches("^[0-9]{6}$"));
    }

    /**
     * Test to verify that the AuthService service's validatePassword method correctly validates passwords.
     * This test verifies that the validatePassword method correctly identifies valid and invalid passwords.
     */
    @Test
    void testValidatePassword() {
        // Arrange
        String validPassword = "Mypassword123@";
        String invalidPassword = "mypassword";

        // Act
        boolean valid = authService.validatePassword(validPassword);

        // Assert
        assertTrue(valid);

        // Act
        boolean invalid = authService.validatePassword(invalidPassword);

        // Assert
        assertFalse(invalid);
    }


    /**
     * Test to verify that the AuthService service's verify method correctly verifies users.
     * This test simulates the verification process of a user and verifies that the returned token is not null and that it matches the expected one.
     */
    @Test
    void testVerify() {
        // Arrange
        String token = "testToken";
        String verificationCode = "123456";
        VerificationRequest verificationRequest = new VerificationRequest(token, verificationCode);
        UnverifiedUser unverifiedUser = UnverifiedUser.builder()
                .authToken(token)
                .email("test@example.com")
                .verificationCode(verificationCode)
                .expiration(Timestamp.from(Instant.now().plusSeconds(3600)))
                .verified(false)
                .build();

        when(unverifiedUserRepository.findByAuthToken(token)).thenReturn(Optional.of(unverifiedUser));
        when(jwtService.isTokenExpired(token)).thenReturn(false);

        // Act
        AuthResponse response = authService.verify(verificationRequest);

        // Assert
        assertNotNull(response);
        assertEquals(token, response.getToken());
        assertTrue(unverifiedUser.isVerified());

        verify(unverifiedUserRepository).findByAuthToken(token);
        verify(jwtService).isTokenExpired(token);
        verify(unverifiedUserRepository).save(unverifiedUser);
    }

    /**
     * Test to verify that the AuthService service's completeRegistration method correctly completes user registration.
     * This test simulates the process of completing a user's registration and verifies that the returned token is not null and matches the expected one.
     */
    @Test
    void testCompleteRegistration() {
        // Arrange
        String token = "testToken";
        CompleteRegistrationRequest request = CompleteRegistrationRequest.builder()
                .token(token)
                .firstName("John")
                .lastName("Doe")
                .password("ValidPassword123!")
                .phone("1234567890")
                .build();

        UnverifiedUser unverifiedUser = UnverifiedUser.builder()
                .authToken(token)
                .email("test@example.com")
                .verified(true)
                .build();

        when(unverifiedUserRepository.findByAuthToken(token)).thenReturn(Optional.of(unverifiedUser));
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");
        when(jwtService.generateToken(unverifiedUser.getEmail())).thenReturn("newToken");

        // Act
        AuthResponse response = authService.completeRegistration(request);

        // Assert
        assertNotNull(response);
        assertEquals("newToken", response.getToken());

        verify(unverifiedUserRepository).findByAuthToken(token);
        verify(passwordEncoder).encode(request.getPassword());
        verify(userRepository).save(any(User.class));
        verify(unverifiedUserRepository).delete(unverifiedUser);
        verify(jwtService).generateToken(unverifiedUser.getEmail());
    }




}
