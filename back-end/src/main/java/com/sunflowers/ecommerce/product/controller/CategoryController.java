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
 * This class handles HTTP requests related to product categories.
 */
@RestController
@RequestMapping("/api/v1/admin/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    /**
     * Endpoint for creating new categories.
     * This method handles POST requests for creating new categories.
     *
     * @param categories a list of CreateCategoryRequest objects representing the new categories to be created
     * @return a ResponseEntity containing the created Category entities
     */
    @PostMapping("/")
    public ResponseEntity<Iterable<Category>> createCategories(@RequestBody List<CreateCategoryRequest> categories) {
        return ResponseEntity.ok(categoryService.createCategories(categories));
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
