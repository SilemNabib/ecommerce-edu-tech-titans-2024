package com.sunflowers.ecommerce.service;

import com.sunflowers.ecommerce.entity.User.User;
import com.sunflowers.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
