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
import java.util.List;

/**
 * Controller for managing product images.
 * Provides endpoints for uploading and retrieving product images.
 */
@RestController
@RequestMapping("/api/v1/admin/product/image")
public class ProductImageController {

    @Autowired
    private ProductImageService productImageService;

    /**
     * Uploads a new product image.
     *
     * @param file the multipart file containing the product image
     * @return a ResponseEntity containing the created ProductImage object and HTTP status code
     */
    @PostMapping("/")
    public ResponseEntity<ProductImage> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                        .body(productImageService.uploadImage(file));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

    /**
     * Handles invalid argument exceptions.
     *
     * @param e the exception that was thrown
     * @return a ResponseEntity containing an ErrorResponse object with the exception details
     */
    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<ErrorResponse> handleArguments(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Bad arguments", e.getMessage()));
    }

    /**
     * Handles general exceptions.
     *
     * @param e the exception that was thrown
     * @return a ResponseEntity containing an ErrorResponse object with the exception details
     */
    @ExceptionHandler({Exception.class})
    public ResponseEntity<ErrorResponse> handleExceptions(Exception e) {
        return ResponseEntity.status(500).body(new ErrorResponse("Unhandled error", e.getMessage()));
    }
}
