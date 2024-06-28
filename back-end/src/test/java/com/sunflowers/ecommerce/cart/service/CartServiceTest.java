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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@SpringBootTest
public class CartServiceTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private UserService userService;

    @Mock
    private InventoryService inventoryService;

    @Mock
    private CartItemRepository cartItemRepository;

    @InjectMocks
    private CartService cartService;

    @Mock
    private HttpServletRequest servletRequest;

    private User mockUser;
    private Inventory mockInventory;
    private CartItem mockCartItem;
    private String authorizationHeader = "Bearer mock_token";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        mockUser = new User();
        mockInventory = new Inventory();
        mockCartItem = new CartItem();
        mockCartItem.setUser(mockUser);
        mockCartItem.setInventory(mockInventory);

        // Configurar el mock de servletRequest para devolver un valor para el header Authorization
        when(servletRequest.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(authorizationHeader);
    }

    @Test
    public void testAddItemToCart_NewItem() {
        // Arrange
        AddProductToCartRequest request = new AddProductToCartRequest();
        request.setInventoryId(1L);
        request.setAmount(2);

        when(jwtService.extractUsername(anyString())).thenReturn("test@example.com");
        when(userService.getUserByEmail(anyString())).thenReturn(mockUser);
        when(inventoryService.getProductInventory(anyLong())).thenReturn(mockInventory);
        when(cartItemRepository.existsByUserAndInventory(any(User.class), any(Inventory.class))).thenReturn(false);
        when(cartItemRepository.save(any(CartItem.class))).thenReturn(mockCartItem);

        // Act
        ResponseEntity<GeneralResponse<CartItem>> response = cartService.addItemToCart(servletRequest, request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals("product added to cart", response.getBody().getMessage());
        assertNotNull(response.getBody().getData());
    }

    @Test
    public void testAddItemToCart_ExistingItem() {
        // Arrange
        AddProductToCartRequest request = new AddProductToCartRequest();
        request.setInventoryId(1L);
        request.setAmount(2);

        when(jwtService.extractUsername(anyString())).thenReturn("test@example.com");
        when(userService.getUserByEmail(anyString())).thenReturn(mockUser);
        when(inventoryService.getProductInventory(anyLong())).thenReturn(mockInventory);
        when(cartItemRepository.existsByUserAndInventory(any(User.class), any(Inventory.class))).thenReturn(true);
        when(cartItemRepository.findByUserAndInventory(any(User.class), any(Inventory.class))).thenReturn(Optional.of(mockCartItem));
        when(cartItemRepository.save(any(CartItem.class))).thenReturn(mockCartItem);

        // Act
        ResponseEntity<GeneralResponse<CartItem>> response = cartService.addItemToCart(servletRequest, request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals("product added to cart", response.getBody().getMessage());
        assertNotNull(response.getBody().getData());
    }


    @Test
    public void testRemoveItemFromCart_ItemDoesNotExist() {
        // Arrange
        Long inventoryId = 1L;
        Integer amount = 1;

        when(jwtService.extractUsername(anyString())).thenReturn("test@example.com");
        when(userService.getUserByEmail(anyString())).thenReturn(mockUser);
        when(inventoryService.getProductInventory(anyLong())).thenReturn(mockInventory);
        when(cartItemRepository.findByUserAndInventory(any(User.class), any(Inventory.class))).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(EntityNotFoundException.class, () -> cartService.removeItemFromCart(servletRequest, inventoryId, amount));
    }


    @Test
    public void testContainsItem_ItemNotInCart() {
        // Arrange
        Long inventoryId = 1L;

        when(jwtService.extractUsername(anyString())).thenReturn("test@example.com");
        when(userService.getUserByEmail(anyString())).thenReturn(mockUser);
        when(inventoryService.getProductInventory(anyLong())).thenReturn(mockInventory);
        when(cartItemRepository.existsByUserAndInventory(any(User.class), any(Inventory.class))).thenReturn(false);

        // Act
        ResponseEntity<GeneralResponse<Boolean>> response = cartService.containsItem(servletRequest, inventoryId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertFalse(response.getBody().getData());
        assertEquals("Item not in cart", response.getBody().getMessage());
    }

    @Test
    public void testGetCart() {
        // Arrange
        when(jwtService.extractUsername(anyString())).thenReturn("test@example.com");
        when(userService.getUserByEmail(anyString())).thenReturn(mockUser);
        when(cartItemRepository.findAllInventoriesFromUser(any(User.class))).thenReturn(new ArrayList<>());

        // Act
        ResponseEntity<GeneralResponse<List<UserCartsDto>>> response = cartService.getCart(servletRequest);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals("Cart items", response.getBody().getMessage());
        assertNotNull(response.getBody().getData());
    }
}


