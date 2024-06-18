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

    /**
     * Endpoint for uploading a product image.
     * This method handles POST requests for uploading a product image.
     *
     * @param file the image file to be uploaded
     * @return a ResponseEntity containing the created ProductImage entity, or a FORBIDDEN status if an error occurred
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
     * Exception handler for IllegalArgumentException.
     * This method returns a ResponseEntity with a BAD_REQUEST status and an ErrorResponse.
     *
     * @param e the exception
     * @return a ResponseEntity with a BAD_REQUEST status and an ErrorResponse
     */
    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<ErrorResponse> handleArguments(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Bad arguments", e.getMessage()));
    }

    /**
     * General exception handler.
     * This method returns a ResponseEntity with an INTERNAL_SERVER_ERROR status and an ErrorResponse.
     *
     * @param e the exception
     * @return a ResponseEntity with an INTERNAL_SERVER_ERROR status and an ErrorResponse
     */
    @ExceptionHandler({Exception.class})
    public ResponseEntity<ErrorResponse> handleExceptions(Exception e) {
        return ResponseEntity.status(500).body(new ErrorResponse("Unhandled error", e.getMessage()));
    }
}
