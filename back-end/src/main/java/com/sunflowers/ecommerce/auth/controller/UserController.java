package com.sunflowers.ecommerce.auth.controller;

import com.sunflowers.ecommerce.auth.request.CreateAddressRequest;
import com.sunflowers.ecommerce.auth.service.UserService;
import io.micrometer.common.lang.NonNull;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;
import com.sunflowers.ecommerce.auth.service.AddressService;

/**
 * Controller for handling user-related HTTP requests.
 */
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AddressService addressService;

    @GetMapping("/profile")
    public MappingJacksonValue getUserProfile(@RequestHeader(name = "Authorization") String authorizationHeader) {
        return userService.getUserProfile(authorizationHeader);
    }

    @GetMapping("/address")
    public MappingJacksonValue getUserAddress(@NonNull @RequestHeader(name = "Authorization") String authorizationHeader) {
        return addressService.getUserAddress(authorizationHeader);
    }

    @GetMapping("/address/{addressId}")
    public MappingJacksonValue getUserAddress(@NonNull @RequestHeader(name = "Authorization") String authorizationHeader, @PathVariable(name = "addressId") String addressId) {
        return addressService.getUserAddress(authorizationHeader, addressId);
    }

    @PostMapping("/address")
    public MappingJacksonValue addUserAddress(@NonNull @RequestHeader(name = "Authorization") String authorizationHeader, @RequestBody CreateAddressRequest address) {
        return addressService.createAddress(authorizationHeader, address);
    }
}
