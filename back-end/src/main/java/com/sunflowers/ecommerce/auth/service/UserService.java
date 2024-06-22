package com.sunflowers.ecommerce.auth.service;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.repository.UserRepository;
import com.sunflowers.ecommerce.utils.EntityMapping;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for handling user-related operations.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public MappingJacksonValue getUserProfile(HttpServletRequest servletRequest) {
        System.out.println("=====================================");
        System.out.println((servletRequest.getHeader((HttpHeaders.AUTHORIZATION))));
        User user = authService.validateAuthorization(servletRequest.getHeader((HttpHeaders.AUTHORIZATION)));
        return EntityMapping.getSimpleBeanPropertyFilter(user, "UserFilter", "email", "firstName", "lastName", "phone", "registrationDate");
    }

    public MappingJacksonValue getAllUsers() {
        List<User> users = (List<User>) userRepository.findAll();
        return EntityMapping.getSimpleBeanPropertyFilter(users, "UserFilter", "email", "firstName", "lastName", "phone", "registrationDate");
    }
}
