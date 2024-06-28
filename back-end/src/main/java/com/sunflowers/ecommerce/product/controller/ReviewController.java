package com.sunflowers.ecommerce.product.controller;

import com.sunflowers.ecommerce.product.entity.Review;
import com.sunflowers.ecommerce.product.request.CreateReviewRequest;
import com.sunflowers.ecommerce.product.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for handling review-related HTTP requests.
 */
@RestController
@RequestMapping("/api/v1/review")
public class ReviewController {

    @Autowired
    private ReviewService productService;

    /**
     * Retrieves reviews for a specific product by its ID.
     *
     * @param id the ID of the product
     * @return a ResponseEntity containing an Iterable of Review entities
     */
    @GetMapping("/product/{id}")
    public ResponseEntity<Iterable<Review>> getReviewsByProductId(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(productService.getReviewsByProductId(id));
    }

    /**
     * Creates a new review for a product.
     *
     * @param request the request containing the review details
     * @param authorizationHeader the authorization header containing the user's credentials
     * @return a ResponseEntity containing the created Review entity
     */
    @PostMapping("/create/")
    public ResponseEntity<Review> createReview(
            @RequestBody CreateReviewRequest request,
            @RequestHeader(name = "Authorization") String authorizationHeader) {
        return ResponseEntity.ok(productService.createReview(authorizationHeader, request));
    }

    /**
     * Handles exceptions thrown by the controller.
     *
     * @param e the exception that was thrown
     * @return a ResponseEntity containing the exception message and a 400 status code
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
