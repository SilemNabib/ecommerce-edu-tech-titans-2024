package com.sunflowers.ecommerce.auth.controller;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for handling user-related HTTP requests.
 */
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Retrieves all users from the system. JUST FOR TESTING PURPOSES.
     *
     * @return an iterable collection of all users
     */
    @GetMapping("/all")
    public Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
