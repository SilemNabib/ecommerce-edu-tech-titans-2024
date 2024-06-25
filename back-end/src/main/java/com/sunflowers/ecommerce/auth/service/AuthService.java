package com.sunflowers.ecommerce.auth.service;

import com.sunflowers.ecommerce.auth.config.JwtAuthenticationFilter;
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
import com.sunflowers.ecommerce.email.EmailService;
import com.sunflowers.ecommerce.email.MailBody;
import com.sunflowers.ecommerce.utils.FrontLinks;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

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
            throw new BadCredentialsException("Email already registered");
        }

        String token = jwtService.generateToken(registerRequest.getEmail(), Timestamp.from(new Date(System.currentTimeMillis() + 1000 * 60 * 15).toInstant()));

        String verificationCode = generateVerificationCode();

        UnverifiedUser user = UnverifiedUser.builder()
                .authToken(token)
                .email(registerRequest.getEmail())
                .verificationCode(verificationCode)
                .expiration(Timestamp.from(new Date(System.currentTimeMillis() + 1000 * 60 * 60).toInstant()))
                .build();

        unverifiedUserRepository.findByEmail(registerRequest.getEmail())
                .ifPresent(unverifiedUserRepository::delete);

        unverifiedUserRepository.save(user);

        String text = "Please use the following code to verify your email: " + verificationCode
                + "\n\nThis code will expire in 15 minutes."
                + "\n\nIf you did not request this code, please ignore this email."
                + "\n\n\n\n" + FrontLinks.VERIFICATION_CODE + "?token=" + token;

        emailService.sendEmail(
                MailBody.builder()
                .to(registerRequest.getEmail())
                .subject("Email Verification")
                .text(text)
                .build()
        );

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
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        if(jwtService.isTokenExpired(user.getAuthToken())) {
            throw new AccountExpiredException("Session expired");
        }

        if (user.getVerificationCode().equals(verificationRequest.getVerificationCode())) {
            user.setVerified(true);
            unverifiedUserRepository.save(user);
        } else {
            throw new AccountExpiredException("Invalid verification code");
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
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        if (!unverifiedUser.isVerified()) {
            throw new IllegalArgumentException("User not verified");
        }

        if (!validatePassword(registerRequest.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        if(!validatePhoneNumber(registerRequest.getPhone())) {
            throw new IllegalArgumentException("Invalid phone number");
        }

        User user = User.builder()
                .firstName(toNameCase(removeDoubleBlanks(registerRequest.getFirstName())))
                .lastName(toNameCase(removeDoubleBlanks(registerRequest.getLastName())))
                .email(unverifiedUser.getEmail().toLowerCase())
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

    public User validateAuthorization(String authToken) {
        String token = JwtAuthenticationFilter.getTokenFromHeader(authToken);

        User user = userRepository.findByEmail(jwtService.extractUsername(token))
                .orElseThrow(() -> new AuthorizationServiceException("User not found"));

        if(!jwtService.validateToken(token, user)){
            throw new AuthorizationServiceException("Unauthorized");
        }
        return user;
    }

    public User validateAuthorization(String authToken, String email) {
        String token = JwtAuthenticationFilter.getTokenFromHeader(authToken);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthorizationServiceException("User not found"));

        if(!jwtService.validateToken(token, user) || !user.getEmail().equalsIgnoreCase(jwtService.extractUsername(token))){
            throw new AuthorizationServiceException("Unauthorized - invalid session or email");
        }
        return user;
    }

    public static boolean validatePhoneNumber(String phone) {
        Pattern pattern = Pattern.compile("\\d*");
        Matcher matcher = pattern.matcher(phone);
        return matcher.matches() && phone.length() == 10;
    }

    /**
     * Converts a string to name case.
     * This method converts a string to name case by capitalizing the first letter of each word given in the name.
     *
     * @param text the text to convert
     * @return the text in name case
     */
    public static String toNameCase(String text) {
        return Arrays.stream(text.split("\\s"))
                .map(word -> Character.toTitleCase(word.charAt(0)) + word.substring(1))
                .collect(Collectors.joining(" "));
    }

    /**
     * Removes double blanks from a string.
     * This method removes double blanks from a string by replacing all occurrences of two or more consecutive spaces with a single space.
     *
     * @param text the text to process
     * @return the text with double blanks removed
     */
    public static String removeDoubleBlanks(String text) {
        return text.replaceAll("\\s+", " ");
    }


    /**
     * Generates a six-digit verification code.
     * This method generates a random six-digit integer and converts it to a string.
     * The generated code is used for user verification purposes.
     *
     * @return a string representation of a six-digit verification code
     */
    public static String generateVerificationCode() {
        int code = (int) ((Math.random() * (999999 - 100000)) + 100000);
        return String.valueOf(code);
    }

    /**
     * Validates a password.
     * @param password the password to validate
     * @return true if the password is valid, false otherwise
     */
    public static boolean validatePassword(String password) {
        return password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!(){}\\[\\]:;,.?/|<>\\-*])(?=\\S+$).{8,}$");
    }

    // TODO: cambiar metodos static y etc (parra ole, santo remedio que te metiste con esos metodos, alo ? jsjsjs)
    public boolean validatePasswordPublic(String password) {
        return password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!(){}\\[\\]:;,.?/|<>\\-*])(?=\\S+$).{8,}$");
    }
}
