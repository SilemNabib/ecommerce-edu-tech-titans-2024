package com.sunflowers.ecommerce.inventory.service;

import com.sunflowers.ecommerce.inventory.entity.Color;
import com.sunflowers.ecommerce.inventory.entity.Inventory;
import com.sunflowers.ecommerce.inventory.repository.ColorRepository;
import com.sunflowers.ecommerce.inventory.repository.InventoryRepository;
import com.sunflowers.ecommerce.inventory.request.CreateColorRequest;
import com.sunflowers.ecommerce.inventory.request.CreateInventoryRequest;
import com.sunflowers.ecommerce.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ColorRepository colorRepository;
    private final ProductRepository productRepository;

    public Inventory getProductInventory(Long inventoryId){
        return inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new NoSuchElementException("Inventory not found"));
    }

    public Iterable<Color> getUniqueColors() {
        return colorRepository.findAll();
    }

    public Iterable<String> getUniqueSizes() {
        return inventoryRepository.findDistinctSizes();
    }

    public Iterable<Inventory> addInventories(Iterable<CreateInventoryRequest> inventoryRequest) {
        ArrayList<Inventory> inventories = new ArrayList<>();
        for (CreateInventoryRequest request : inventoryRequest) {
            Inventory inventory = Inventory.builder()
                    .product(productRepository.findById(request.getProductId()).orElseThrow(() -> new NoSuchElementException("Product not found")))
                    .color(colorRepository.findById(request.getColorName()).orElseThrow(()-> new NoSuchElementException("Color not found")))
                    .size(request.getSize().toUpperCase())
                    .stock(request.getStock())
                    .build();
            inventories.add(inventoryRepository.save(inventory));
        }
        return inventories;
    }

    public Iterable<Color> addColors(Iterable<CreateColorRequest> colors) {
        ArrayList<Color> colorList = new ArrayList<>();
        for (CreateColorRequest color : colors) {
            Color newColor = Color.builder()
                    .name(color.getName().toLowerCase())
                    .code(color.getCode().toUpperCase())
                    .build();
            colorList.add(colorRepository.save(newColor));
        }
        return colorList;
    }
}
