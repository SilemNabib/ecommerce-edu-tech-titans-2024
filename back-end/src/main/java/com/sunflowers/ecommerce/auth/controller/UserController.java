package com.sunflowers.ecommerce.auth.controller;

import com.sunflowers.ecommerce.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
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

    @GetMapping("/{userID}")
    public MappingJacksonValue getUserProfile(@RequestHeader(name = "Authorization") String authorizationHeader) {
        return userService.getUserProfile(authorizationHeader);
    }
}
