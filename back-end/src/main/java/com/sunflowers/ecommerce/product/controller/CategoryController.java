package com.sunflowers.ecommerce.product.controller;

import com.sunflowers.ecommerce.auth.response.ErrorResponse;
import com.sunflowers.ecommerce.product.entity.Category;
import com.sunflowers.ecommerce.product.request.CreateCategoryRequest;
import com.sunflowers.ecommerce.product.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/")
    public ResponseEntity<Iterable<Category>> createCategories(@RequestBody List<CreateCategoryRequest> categories) {
        return ResponseEntity.ok(categoryService.createCategories(categories));
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
