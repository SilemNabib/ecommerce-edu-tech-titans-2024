package com.sunflowers.ecommerce.order.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.sunflowers.ecommerce.auth.config.JwtAuthenticationFilter;
import com.sunflowers.ecommerce.auth.entity.Address;
import com.sunflowers.ecommerce.auth.repository.AddressRepository;
import com.sunflowers.ecommerce.cart.entity.CartItem;
import com.sunflowers.ecommerce.cart.repository.CartItemRepository;
import com.sunflowers.ecommerce.inventory.entity.Inventory;
import com.sunflowers.ecommerce.inventory.repository.InventoryRepository;
import com.sunflowers.ecommerce.order.entity.*;
import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.order.repository.*;
import com.sunflowers.ecommerce.auth.service.*;
import com.sunflowers.ecommerce.order.service.*;
import com.sunflowers.ecommerce.order.dto.*;
import com.sunflowers.ecommerce.order.request.GenerateOrderRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.*;

@SpringBootTest
public class OrderServiceTest {

    @Mock
    private AuthService authService;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private UserService userService;

    @Mock
    private JwtService jwtService;

    @Mock
    private AddressRepository addressRepository;

    @Mock
    private CartItemRepository cartItemRepository;

    @Mock
    private OrderRepositoryPageable orderPageableRepository;

    @Mock
    private InventoryRepository inventoryRepository;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetOrderByIdOrderNotFound() {
        // Arrange
        UUID orderId = UUID.randomUUID();
        when(orderRepository.findById(orderId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> orderService.getOrderById(orderId.toString()));
    }


    @Test
    public void testCreateOrderInvalidAddress() {
        // Arrange
        String authorizationHeader = "Bearer token";
        GenerateOrderRequest request = new GenerateOrderRequest();
        request.setAddressId(UUID.randomUUID().toString());

        String token = "token";
        User user = new User();

        when(jwtService.extractUsername(token)).thenReturn("user@example.com");
        when(userService.getUserByEmail("user@example.com")).thenReturn(user);
        when(addressRepository.findById(UUID.fromString(request.getAddressId()))).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> orderService.createOrder(authorizationHeader, request));
    }

    @Test
    public void testCreateOrderInsufficientStock() {
        // Arrange
        String authorizationHeader = "Bearer token";
        GenerateOrderRequest request = new GenerateOrderRequest();
        request.setAddressId(UUID.randomUUID().toString());

        String token = "token";
        User user = new User();
        Address address = new Address();
        CartItem cartItem = new CartItem();
        Inventory inventory = new Inventory();
        inventory.setStock(0);
        cartItem.setInventory(inventory);
        List<CartItem> items = Arrays.asList(cartItem);

        when(jwtService.extractUsername(token)).thenReturn("user@example.com");
        when(userService.getUserByEmail("user@example.com")).thenReturn(user);
        when(addressRepository.findById(UUID.fromString(request.getAddressId()))).thenReturn(Optional.of(address));
        when(cartItemRepository.findAllByUser(user)).thenReturn(items);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> orderService.createOrder(authorizationHeader, request));
    }
}

