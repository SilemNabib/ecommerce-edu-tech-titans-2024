package com.sunflowers.ecommerce.product.controller;

import com.sunflowers.ecommerce.auth.response.ErrorResponse;
import com.sunflowers.ecommerce.product.entity.Category;
import com.sunflowers.ecommerce.product.request.CreateCategoryRequest;
import com.sunflowers.ecommerce.product.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing product categories.
 * Provides endpoints for creating categories.
 */
@RestController
@RequestMapping("/api/v1/admin/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    /**
     * Creates new categories.
     *
     * @param categories a list of CreateCategoryRequest objects containing the category details
     * @return a ResponseEntity containing an iterable of created Category objects
     */
    @PostMapping("/")
    public ResponseEntity<Iterable<Category>> createCategories(@RequestBody List<CreateCategoryRequest> categories) {
        return ResponseEntity.ok(categoryService.createCategories(categories));
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
