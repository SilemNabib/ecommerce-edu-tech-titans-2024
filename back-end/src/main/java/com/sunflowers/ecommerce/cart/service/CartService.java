package com.sunflowers.ecommerce.cart.service;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.service.JwtService;
import com.sunflowers.ecommerce.auth.service.UserService;
import com.sunflowers.ecommerce.cart.entity.CartItem;
import com.sunflowers.ecommerce.cart.repository.CartItemRepository;
import com.sunflowers.ecommerce.cart.request.AddProductToCartRequest;
import com.sunflowers.ecommerce.inventory.entity.Inventory;
import com.sunflowers.ecommerce.inventory.service.InventoryService;
import com.sunflowers.ecommerce.response.GeneralResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {

    private final JwtService jwtService;
    private final UserService userService;
    private final InventoryService inventoryService;

    private final CartItemRepository cartItemRepository;

    private User getUserFromRequest(HttpServletRequest request) {
        String token = (request.getHeader(HttpHeaders.AUTHORIZATION)).substring(7);
        String username = jwtService.extractUsername(token);
        return userService.getUserByEmail(username);
    }

    private boolean productIsInCart(User user, Inventory inventory) {
        return cartItemRepository.existsByUserAndInventory(user, inventory);
    }

    public ResponseEntity<GeneralResponse<CartItem>> addProductToCart(HttpServletRequest servletRequest, AddProductToCartRequest request) {
        User user = getUserFromRequest(servletRequest);
        Inventory inventory = inventoryService.getProductInventory(request.getInventoryId());

        if (productIsInCart(user, inventory)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(GeneralResponse.<CartItem>builder()
                    .statusCode(HttpStatus.CONFLICT.value())
                    .message("Product already in cart")
                    .success(false)
                    .data(null)
                    .build());
        }

        CartItem cartItem = CartItem.builder()
                .user(user)
                .inventory(inventory)
                .amount(request.getAmount())
                .build();
        cartItemRepository.save(cartItem);

        return  ResponseEntity.status(HttpStatus.OK)
                .body(GeneralResponse.<CartItem>builder()
                .statusCode(HttpStatus.OK.value())
                .message("product added to cart")
                .success(true)
                .data(cartItem)
                .build());
    }
}
