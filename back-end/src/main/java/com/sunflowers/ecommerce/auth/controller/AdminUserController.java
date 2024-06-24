package com.sunflowers.ecommerce.auth.controller;

import com.sunflowers.ecommerce.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/user")
public class AdminUserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public MappingJacksonValue getAdminUsers() {
        return userService.getAllUsers();
    }
}
