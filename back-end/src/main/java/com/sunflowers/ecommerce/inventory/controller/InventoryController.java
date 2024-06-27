package com.sunflowers.ecommerce.inventory.controller;

import com.sunflowers.ecommerce.inventory.response.UniqueColorsAndSizesResponse;
import com.sunflowers.ecommerce.inventory.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/product/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/unique")
    public ResponseEntity<UniqueColorsAndSizesResponse> getUniqueColorsAndSizes() {
        return ResponseEntity.ok(
                UniqueColorsAndSizesResponse.builder()
                        .sizes(inventoryService.getUniqueSizes())
                        .colors(inventoryService.getUniqueColors())
                        .build());
    }
}
