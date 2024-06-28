package com.sunflowers.ecommerce.auth.controller;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.request.ChangePasswordRequest;
import com.sunflowers.ecommerce.auth.request.ChangePhoneRequest;
import com.sunflowers.ecommerce.auth.request.CreateAddressRequest;
import com.sunflowers.ecommerce.auth.service.UserService;
import com.sunflowers.ecommerce.response.GeneralResponse;
import io.micrometer.common.lang.NonNull;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;
import com.sunflowers.ecommerce.auth.service.AddressService;

/**
 * Controller for handling user-related HTTP requests.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @Autowired
    private AddressService addressService;

    @GetMapping("/profile")
    public User getUserProfile(@RequestHeader(name = "Authorization") String authorizationHeader) {
        return userService.getUserProfile(authorizationHeader);
    }

    @PostMapping("/change-password")
    public ResponseEntity<GeneralResponse<Void>> changePassword(@RequestHeader(name = "Authorization") String authorizationHeader, @RequestBody ChangePasswordRequest passwordRequest) {
        return userService.changePassword(authorizationHeader, passwordRequest);
    }

    @PostMapping("/change-phone")
    public ResponseEntity<GeneralResponse<Void>> changePhone(@RequestHeader(name = "Authorization") String authorizationHeader, @RequestBody ChangePhoneRequest phoneRequest) {
        return userService.changePhone(authorizationHeader, phoneRequest);
    }


    @ExceptionHandler
    public ResponseEntity<GeneralResponse<Void>> handleException(Exception e, HttpServletRequest request) {
        return ResponseEntity.badRequest()
                .body(
                        GeneralResponse.<Void>builder()
                                .statusCode(400)
                                .success(false)
                                .message(e.getMessage())
                                .build()
                );
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
