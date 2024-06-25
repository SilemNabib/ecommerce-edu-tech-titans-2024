package com.sunflowers.ecommerce.auth.service;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.repository.UserRepository;
import com.sunflowers.ecommerce.auth.request.ChangePasswordRequest;
import com.sunflowers.ecommerce.auth.request.ChangePhoneRequest;
import com.sunflowers.ecommerce.response.GeneralResponse;
import com.sunflowers.ecommerce.utils.EntityMapping;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for handling user-related operations.
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public MappingJacksonValue getUserProfile(String authorizationHeader) {
        User user = authService.validateAuthorization(authorizationHeader);
        return EntityMapping.getSimpleBeanPropertyFilter(user, "UserFilter", "email", "firstName", "lastName", "phone", "registrationDate");
    }

    public MappingJacksonValue getAllUsers() {
        List<User> users = (List<User>) userRepository.findAll();
        return EntityMapping.getSimpleBeanPropertyFilter(users, "UserFilter", "email", "firstName", "lastName", "phone", "registrationDate");
    }

    public ResponseEntity<GeneralResponse<Void>> changePassword(String authorizationHeader, ChangePasswordRequest passwordRequest) {
        User user = authService.validateAuthorization(authorizationHeader);

        if (!passwordEncoder.matches(passwordRequest.getOldPassword(), user.getPassword())) {
            return ResponseEntity.badRequest()
                    .body(
                            GeneralResponse.<Void>builder()
                                    .statusCode(400)
                                    .success(false)
                                    .message("user's password is incorrect")
                                    .build()
                    );
        }

        if (!authService.validatePasswordPublic(passwordRequest.getNewPassword())) {
            return ResponseEntity.badRequest()
                    .body(
                            GeneralResponse.<Void>builder()
                                    .statusCode(400)
                                    .success(false)
                                    .message("Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character")
                                    .build()
                    );
        }

        if (!passwordRequest.getNewPassword().equals(passwordRequest.getConfirmPassword())) {
            return ResponseEntity.badRequest()
                    .body(
                            GeneralResponse.<Void>builder()
                                    .statusCode(400)
                                    .success(false)
                                    .message("Passwords do not match")
                                    .build()
                    );
        }

        user.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(
                GeneralResponse.<Void>builder()
                        .statusCode(200)
                        .success(true)
                        .message("Password changed successfully")
                        .build()
        );
    }

    public ResponseEntity<GeneralResponse<Void>> changePhone(String authorizationHeader, ChangePhoneRequest phoneRequest) {
        User user = authService.validateAuthorization(authorizationHeader);

        if (!passwordEncoder.matches(phoneRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest()
                    .body(
                            GeneralResponse.<Void>builder()
                                    .statusCode(400)
                                    .success(false)
                                    .message("user's password is incorrect")
                                    .build()
                    );
        }

        if (!authService.validatePhoneNumberPublic(phoneRequest.getNewPhone())) {
            return ResponseEntity.badRequest()
                    .body(
                            GeneralResponse.<Void>builder()
                                    .statusCode(400)
                                    .success(false)
                                    .message("Phone number is invalid")
                                    .build()
                    );
        }

        user.setPhone(phoneRequest.getNewPhone());
        userRepository.save(user);

        return ResponseEntity.ok(
                GeneralResponse.<Void>builder()
                        .statusCode(200)
                        .success(true)
                        .message("Phone number changed successfully")
                        .build()
        );
    }
}
