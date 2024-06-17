package com.sunflowers.ecommerce.auth.service;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Service class for handling user-related operations.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Retrieves all users from the repository. JUST FOR TESTING PURPOSES.
     *
     * @return an iterable collection of all users
     */
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
