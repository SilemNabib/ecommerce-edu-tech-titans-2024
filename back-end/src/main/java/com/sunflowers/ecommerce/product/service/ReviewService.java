package com.sunflowers.ecommerce.product.service;

import com.sunflowers.ecommerce.auth.config.JwtAuthenticationFilter;
import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.service.JwtService;
import com.sunflowers.ecommerce.auth.service.UserService;
import com.sunflowers.ecommerce.product.entity.Review;
import com.sunflowers.ecommerce.product.repository.ReviewRepository;
import com.sunflowers.ecommerce.product.request.CreateReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    JwtService jwtService;

    public Iterable<Review> getReviewsByProductId(Long id) {
        return reviewRepository.findAllByProductId(id);
    }

    public Review createReview(String authorizationHeader, CreateReviewRequest request) {
        String token = JwtAuthenticationFilter.getTokenFromHeader(authorizationHeader);

        User user = userService.getUserByEmail(jwtService.extractUsername(token));

        Review review = Review.builder()
                .user(user)
                .creationDate(Timestamp.from(new java.util.Date(System.currentTimeMillis()).toInstant()))
                .comment(request.getComment())
                .product(productService.getProductById(request.getProductId()))
                .rating(request.getRating())
                .build();

        return reviewRepository.save(review);
    }
}
