package com.sunflowers.ecommerce.inventory.controller;

import com.sunflowers.ecommerce.inventory.entity.Color;
import com.sunflowers.ecommerce.inventory.entity.Inventory;
import com.sunflowers.ecommerce.inventory.request.CreateColorRequest;
import com.sunflowers.ecommerce.inventory.request.CreateInventoryRequest;
import com.sunflowers.ecommerce.inventory.service.InventoryService;
import com.sunflowers.ecommerce.response.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/admin/product/inventory")
public class InventoryAdminController {

    @Autowired
    private InventoryService inventoryService;

    @PostMapping("/")
    public ResponseEntity<GeneralResponse<Iterable<Inventory>>> addInventories(@RequestBody Iterable<CreateInventoryRequest> inventoryRequests) {
        return ResponseEntity.ok(
                GeneralResponse.<Iterable<Inventory>>builder()
                        .statusCode(HttpStatus.CREATED.value())
                        .message("Inventories added successfully")
                        .success(true)
                        .data(inventoryService.addInventories(inventoryRequests))
                        .build());
    }

    @PostMapping("/color")
    public ResponseEntity<GeneralResponse<Iterable<Color>>> addColors(@RequestBody Iterable<CreateColorRequest> colors) {
        return ResponseEntity.ok(
                GeneralResponse.<Iterable<Color>>builder()
                        .statusCode(HttpStatus.CREATED.value())
                        .message("Colors added successfully")
                        .success(true)
                        .data(inventoryService.addColors(colors))
                        .build());
    }

    @ExceptionHandler({NoSuchElementException.class, IllegalArgumentException.class})
    public ResponseEntity<GeneralResponse<Void>> handleNoSuchElementException(NoSuchElementException e) {
        return ResponseEntity.badRequest()
                .body(GeneralResponse.<Void>builder()
                        .statusCode(HttpStatus.BAD_REQUEST.value())
                        .message(e.getMessage())
                        .success(false)
                        .build());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<GeneralResponse<Void>> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(GeneralResponse.<Void>builder()
                        .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .message(e.getMessage())
                        .success(false)
                        .build());
    }
}
