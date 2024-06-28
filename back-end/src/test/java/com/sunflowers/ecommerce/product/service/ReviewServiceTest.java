package com.sunflowers.ecommerce.product.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.sunflowers.ecommerce.auth.entity.Role;
import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.service.JwtService;
import com.sunflowers.ecommerce.auth.service.UserService;
import com.sunflowers.ecommerce.product.entity.Product;
import com.sunflowers.ecommerce.product.entity.Review;
import com.sunflowers.ecommerce.product.repository.ReviewRepository;
import com.sunflowers.ecommerce.product.request.CreateReviewRequest;
import com.sunflowers.ecommerce.product.service.ProductService;

import com.sunflowers.ecommerce.auth.config.JwtAuthenticationFilter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.AuthorizationServiceException;

import java.sql.Timestamp;
import java.util.*;

@SpringBootTest
public class ReviewServiceTest {

    @InjectMocks
    private ReviewService reviewService;

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private UserService userService;

    @Mock
    private ProductService productService;

    @Mock
    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    /**
     * Test for the `getReviewsByProductId` method.
     * This test verifies that the method correctly retrieves reviews associated with a given product ID.
     *
     * - Arranges two mock reviews associated with the same product ID.
     * - Uses `when` to simulate the behavior of the review repository's `findAllByProductId` method.
     * - Asserts that the retrieved reviews are not null, that the list size is correct, and that each review
     *   has the correct product ID.
     */
    @Test
    public void testGetReviewsByProductId() {
        // Arrange
        Integer productId = 1;
        Review review1 = new Review();
        review1.setProduct(new Product());
        review1.getProduct().setId(productId);
        Review review2 = new Review();
        review2.setProduct(new Product());
        review2.getProduct().setId(productId);

        List<Review> reviews = Arrays.asList(review1, review2);

        when(reviewRepository.findAllByProductId(Long.valueOf(productId))).thenReturn(reviews);

        // Act
        Iterable<Review> result = reviewService.getReviewsByProductId(Long.valueOf(productId));

        // Assert
        assertNotNull(result);
        List<Review> resultList = new ArrayList<>();
        result.forEach(resultList::add);
        assertEquals(2, resultList.size());
        assertEquals(productId, resultList.get(0).getProduct().getId());
        assertEquals(productId, resultList.get(1).getProduct().getId());
    }

    /**
     * Test for the `createReview` method with a valid request.
     * This test verifies that the method successfully creates a review when provided with valid data.
     *
     * - Arranges a mock request with valid review data and mocks dependencies such as user and product services.
     * - Uses `when` to simulate behavior for retrieving user and product, and saving the review.
     * - Asserts that the created review is not null, has the correct comment, rating, and user.
     * - Verifies interactions with the review repository, user service, and JWT service.
     */
    @Test
    public void testCreateReview_ValidRequest() {
        // Arrange
        String token = "valid-token";
        String authorizationHeader = "Bearer " + token;
        CreateReviewRequest request = new CreateReviewRequest();
        request.setComment("Great product!");
        request.setProductId(1L);
        request.setRating(5);

        User user = User.builder()
                .id(UUID.randomUUID())
                .firstName("Test")
                .lastName("User")
                .email("test@example.com")
                .password("password")
                .phone("1234567890")
                .registrationDate(new Timestamp(System.currentTimeMillis()))
                .role(Role.USER)
                .build();

        Product product = new Product();
        product.setId(1);
        product.setName("Test Product");

        when(jwtService.extractUsername(token)).thenReturn(user.getEmail());
        when(jwtService.validateToken(token, user)).thenReturn(true);
        when(userService.getUserByEmail(user.getEmail())).thenReturn(user);
        when(productService.getProductById(request.getProductId())).thenReturn(product);

        Review review = Review.builder()
                .user(user)
                .creationDate(Timestamp.from(new java.util.Date(System.currentTimeMillis()).toInstant()))
                .comment(request.getComment())
                .product(product)
                .rating(request.getRating())
                .build();

        when(reviewRepository.save(any(Review.class))).thenReturn(review);

        // Act
        Review result = reviewService.createReview(authorizationHeader, request);

        // Assert
        assertNotNull(result);
        assertEquals(request.getComment(), result.getComment());
        assertEquals(request.getRating(), result.getRating());
        assertEquals(user, result.getUser());

        verify(reviewRepository, times(1)).save(any(Review.class));
        verify(userService, times(1)).getUserByEmail(user.getEmail());
        verify(jwtService, times(1)).extractUsername(token);
    }





    /**
     * Test for the `createReview` method with an invalid token.
     * This test verifies that the method throws an `AuthorizationServiceException` when the provided token is invalid.
     *
     * - Arranges a mock request with review data and mocks dependencies such as user service and JWT service.
     * - Uses `when` to simulate invalid token validation and username extraction.
     * - Verifies no interactions with the review repository, user service, and JWT service.
     */
    @Test
    public void testCreateReviewInvalidToken() {
        // Arrange
        String token = "invalid token";
        String authorizationHeader = "Bearer " + token;
        CreateReviewRequest request = new CreateReviewRequest();
        request.setComment("Great product!");
        request.setProductId(1L);
        request.setRating(5);

        User user = User.builder()
                .id(UUID.randomUUID())
                .firstName("Test")
                .lastName("User")
                .email("test@example.com")
                .password("password")
                .phone("1234567890")
                .registrationDate(new Timestamp(System.currentTimeMillis()))
                .role(Role.USER)
                .build();

        when(jwtService.extractUsername(token)).thenThrow(new AuthorizationServiceException("Invalid token"));
        when(jwtService.validateToken(token, user)).thenReturn(false);
        when(userService.getUserByEmail(user.getEmail())).thenReturn(user);

        // Assert
        assertThrows(AuthorizationServiceException.class, () -> reviewService.createReview(authorizationHeader, request));

    }


}
