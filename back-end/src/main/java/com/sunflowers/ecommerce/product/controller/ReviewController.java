package com.sunflowers.ecommerce.product.controller;

import com.sunflowers.ecommerce.product.entity.Review;
import com.sunflowers.ecommerce.product.request.CreateReviewRequest;
import com.sunflowers.ecommerce.product.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/review")
public class ReviewController {

    @Autowired
    private ReviewService productService;

    @GetMapping("/product/{id}")
    public ResponseEntity<Iterable<Review>> getReviewsByProductId(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(productService.getReviewsByProductId(id));
    }

    @PostMapping("/create/")
    public ResponseEntity<Review> createReview(
            @RequestBody CreateReviewRequest request,
            @RequestHeader(name = "Authorization") String authorizationHeader) {
        return ResponseEntity.ok(productService.createReview(authorizationHeader, request));
    }
}
