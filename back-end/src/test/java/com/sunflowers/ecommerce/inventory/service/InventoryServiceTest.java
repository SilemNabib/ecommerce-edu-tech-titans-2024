package com.sunflowers.ecommerce.inventory.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.sunflowers.ecommerce.inventory.entity.Color;
import com.sunflowers.ecommerce.inventory.entity.Inventory;
import com.sunflowers.ecommerce.inventory.repository.ColorRepository;
import com.sunflowers.ecommerce.inventory.repository.InventoryRepository;
import com.sunflowers.ecommerce.inventory.request.CreateColorRequest;
import com.sunflowers.ecommerce.inventory.request.CreateInventoryRequest;
import com.sunflowers.ecommerce.product.entity.Product;
import com.sunflowers.ecommerce.product.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;


@SpringBootTest
public class InventoryServiceTest {

    @Mock
    private InventoryRepository inventoryRepository;

    @Mock
    private ColorRepository colorRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private InventoryService inventoryService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }


    @Test
    public void testGetProductInventory_InventoryNotFound() {
        // Arrange
        Long inventoryId = 1L;

        when(inventoryRepository.findById(inventoryId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(NoSuchElementException.class, () -> inventoryService.getProductInventory(inventoryId));
    }

}

