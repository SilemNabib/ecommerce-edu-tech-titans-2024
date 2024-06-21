package com.sunflowers.ecommerce.cart.service;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.service.JwtService;
import com.sunflowers.ecommerce.auth.service.UserService;
import com.sunflowers.ecommerce.cart.dto.UserCartsDto;
import com.sunflowers.ecommerce.cart.entity.CartItem;
import com.sunflowers.ecommerce.cart.repository.CartItemRepository;
import com.sunflowers.ecommerce.cart.request.AddProductToCartRequest;
import com.sunflowers.ecommerce.inventory.entity.Inventory;
import com.sunflowers.ecommerce.inventory.service.InventoryService;
import com.sunflowers.ecommerce.response.GeneralResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public ResponseEntity<GeneralResponse<CartItem>> addItemToCart(HttpServletRequest servletRequest, AddProductToCartRequest request) {
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

    public ResponseEntity<GeneralResponse<Boolean>> containsItem(HttpServletRequest servletRequest, Long inventoryId) {
        User user = getUserFromRequest(servletRequest);
        Inventory inventory = inventoryService.getProductInventory(inventoryId);

        boolean contains = productIsInCart(user, inventory);
        String message = "Items in cart";

        if (!contains) {
            message = "Item not in cart";
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(GeneralResponse.<Boolean>builder()
                        .statusCode(HttpStatus.OK.value())
                        .message(message)
                        .success(true)
                        .data(contains)
                        .build());
    }

    public ResponseEntity<GeneralResponse<Boolean>> removeItemFromCart(HttpServletRequest servletRequest, Long inventoryId) {
        User user = getUserFromRequest(servletRequest);
        Inventory inventory = inventoryService.getProductInventory(inventoryId);

        CartItem cartItem = cartItemRepository.findByUserAndInventory(user, inventory)
                .orElseThrow(() -> new EntityNotFoundException("Item not found in cart"));

        cartItemRepository.delete(cartItem);

        return ResponseEntity.status(HttpStatus.OK)
                .body(GeneralResponse.<Boolean>builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Product removed from cart")
                        .success(true)
                        .data(true)
                        .build());
    }

    public ResponseEntity<GeneralResponse<List<UserCartsDto>>> getCart(HttpServletRequest servletRequest) {
        User user = getUserFromRequest(servletRequest);
        List<UserCartsDto> cartItems = cartItemRepository.findAllInventoriesFromUser(user);

        return ResponseEntity.status(HttpStatus.OK)
                .body(GeneralResponse.<List<UserCartsDto>>builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Cart items")
                        .success(true)
                        .data(cartItems)
                        .build());
    }
}
