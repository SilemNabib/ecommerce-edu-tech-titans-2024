package com.sunflowers.ecommerce.auth.service;

import com.sunflowers.ecommerce.auth.entity.PasswordResetToken;
import com.sunflowers.ecommerce.auth.entity.Role;
import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.repository.PasswordResetRepository;
import com.sunflowers.ecommerce.auth.repository.UserRepository;
import com.sunflowers.ecommerce.auth.request.VerifyEmailRequest;
import com.sunflowers.ecommerce.email.EmailService;
import com.sunflowers.ecommerce.email.MailBody;
import com.sunflowers.ecommerce.response.GeneralResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class PasswordResetServiceTest {

    /*
    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private PasswordResetRepository passwordResetRepository;

    @InjectMocks
    private PasswordResetService passwordResetService;

    @Mock
    private User user;

    @Mock
    private VerifyEmailRequest emailRequest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail("test@gmail.com");
        user.setFirstName("Tester");
        user.setLastName("Test");
        user.setPassword("MyPassword123");
        user.setRole(Role.USER);
        user.setPhone("1000000000");

        emailRequest = new VerifyEmailRequest();
        emailRequest.setEmail("test@gmail.com");
    }

    @Test
    void testVerifyEmail() {
        // Arrange
        when(userRepository.findByEmail(any(String.class))).thenReturn(Optional.of(user));
        when(passwordResetRepository.findById(any(UUID.class))).thenReturn(Optional.of(new PasswordResetToken()));

        // Act
        GeneralResponse<Void> response = passwordResetService.verifyEmail(emailRequest);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }



    @Test
    void testVerifyEmail_UserNotFound() {
        // Arrange
        when(userRepository.findByEmail(any(String.class))).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UsernameNotFoundException.class, () -> {
            passwordResetService.verifyEmail(emailRequest);
        });
    }

     */
}

