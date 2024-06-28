package com.sunflowers.ecommerce.cart.controller;

import com.sunflowers.ecommerce.cart.dto.UserCartsDto;
import com.sunflowers.ecommerce.cart.entity.CartItem;
import com.sunflowers.ecommerce.cart.request.AddProductToCartRequest;
import com.sunflowers.ecommerce.cart.service.CartService;
import com.sunflowers.ecommerce.inventory.entity.Inventory;
import com.sunflowers.ecommerce.response.GeneralResponse;
import jakarta.servlet.http.HttpServletRequest;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cart")
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<GeneralResponse<List<UserCartsDto>>> addItemToCart(@NonNull HttpServletRequest servletRequest, @RequestBody AddProductToCartRequest request) {
        cartService.addItemToCart(servletRequest, request);
        return cartService.getCart(servletRequest);
    }

    @GetMapping("/contains/{inventoryId}")
        public ResponseEntity<GeneralResponse<Boolean>> containsItem(@NonNull HttpServletRequest servletRequest, @PathVariable(name = "inventoryId") Long inventoryId) {
        return cartService.containsItem(servletRequest, inventoryId);
    }

    @DeleteMapping("/remove/{inventoryId}")
    public ResponseEntity<GeneralResponse<List<UserCartsDto>>> removeItemFromCart(@NonNull HttpServletRequest servletRequest, @PathVariable(name = "inventoryId") Long inventoryId, @RequestParam(required = false, name = "amount") Integer amount){
        cartService.removeItemFromCart(servletRequest, inventoryId, amount);
        return cartService.getCart(servletRequest);
    }

    @GetMapping("/get")
    public ResponseEntity<GeneralResponse<List<UserCartsDto>>> getCart(@NonNull HttpServletRequest servletRequest) {
        return cartService.getCart(servletRequest);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
