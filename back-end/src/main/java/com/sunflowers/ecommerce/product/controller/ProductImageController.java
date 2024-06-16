package com.sunflowers.ecommerce.product.controller;

import com.sunflowers.ecommerce.auth.response.ErrorResponse;
import com.sunflowers.ecommerce.product.entity.ProductImage;
import com.sunflowers.ecommerce.product.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/admin/product/image")
public class ProductImageController {

    @Autowired
    private ProductImageService productImageService;

    @PostMapping("/")
    public ResponseEntity<ProductImage> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                        .body(productImageService.uploadImage(file));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<ErrorResponse> handleArguments(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Bad arguments", e.getMessage()));
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ErrorResponse> handleExceptions(Exception e) {
        return ResponseEntity.status(500).body(new ErrorResponse("Unhandled error", e.getMessage()));
    }
}
