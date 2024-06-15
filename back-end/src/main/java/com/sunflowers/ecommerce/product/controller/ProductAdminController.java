package com.sunflowers.ecommerce.product.controller;

import com.sunflowers.ecommerce.product.entity.Product;
import com.sunflowers.ecommerce.product.request.CreateProductRequest;
import com.sunflowers.ecommerce.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/product")
public class ProductAdminController {

    @Autowired
    private ProductService productService;

    /**
     * Creates a new product.
     * This method will take a CreateProductRequest object and return the created product.
     * The product will be persisted in the database.
     *
     * @param request the request containing the product details
     * @return the created product
     */
    @PostMapping("/")
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest request) {
        Product createdProduct = productService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    /**
     * Handles invalid argument exceptions.
     *
     * @param e the exception that was thrown
     * @return a response entity with the exception message
     */
    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<String> handleArguments(Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

}
