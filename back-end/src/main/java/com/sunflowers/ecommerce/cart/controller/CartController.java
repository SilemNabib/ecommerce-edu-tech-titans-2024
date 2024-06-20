package com.sunflowers.ecommerce.cart.controller;

import com.sunflowers.ecommerce.cart.entity.CartItem;
import com.sunflowers.ecommerce.cart.request.AddProductToCartRequest;
import com.sunflowers.ecommerce.cart.service.CartService;
import com.sunflowers.ecommerce.response.GeneralResponse;
import jakarta.servlet.http.HttpServletRequest;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cart")
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<GeneralResponse<CartItem>> addItemToCart(@NonNull HttpServletRequest servletRequest, @RequestBody AddProductToCartRequest request) {
        return cartService.addProductToCart(servletRequest, request);
    }

    @GetMapping("/contains/{inventoryId}")
    public ResponseEntity<GeneralResponse<Boolean>> containsItem(@NonNull HttpServletRequest servletRequest, @PathVariable Long inventoryId) {
        return cartService.containsItem(servletRequest, inventoryId);
    }
}
