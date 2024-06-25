package com.sunflowers.ecommerce.product.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.sunflowers.ecommerce.product.entity.Category;
import com.sunflowers.ecommerce.product.entity.Product;
import com.sunflowers.ecommerce.product.entity.ProductImage;
import com.sunflowers.ecommerce.product.repository.CategoryRepository;
import com.sunflowers.ecommerce.product.repository.ProductImageRepository;
import com.sunflowers.ecommerce.product.repository.ProductRepository;
import com.sunflowers.ecommerce.product.request.CreateProductRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@SpringBootTest
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ProductImageRepository productImageRepository;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    /**
     * Test for the `getProductById` method when the product exists.
     * This test verifies that the method returns the product with the specified ID if it exists in the repository.
     *
     * - Arranges a mock product and mocks the repository's `findById` behavior.
     * - Uses `when` to simulate finding the product by ID.
     * - Asserts that the result is not null, has the correct ID, and has the correct name.
     */
    @Test
    public void testGetProductByIdProductExists() {
        // Arrange:
        Product product = new Product();
        product.setId(1);
        product.setName("Test Product");

        when(productRepository.findById(any(Long.class))).thenReturn(Optional.of(product));

        // Act
        Product result = productService.getProductById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Test Product", result.getName());
    }



    /**
     * Test for the `getProductById` method when the product does not exist.
     * This test verifies that the method returns null if the product with the specified ID does not exist in the repository.
     *
     * - Arranges a mock product ID and mocks the repository's `findById` behavior to return empty.
     * - Uses `when` to simulate the repository returning an empty result.
     * - Asserts that the result is null.
     */
    @Test
    public void testGetProductByIdProductNotFound() {
        // Arrange
        Long productId = 1L;
        when(productRepository.findById(productId)).thenReturn(Optional.empty());

        // Act
        Product result = productService.getProductById(productId);

        // Assert
        assertNull(result);
    }


    /**
     * Test for the `createProduct` method with a valid request.
     * This test verifies that the method creates and returns a new product when provided with a valid request.
     *
     * - Arranges a mock `CreateProductRequest` with valid data.
     * - Mocks the behaviors of the category repository, product image repository, and product repository.
     * - Uses `when` to simulate saving the new product.
     * - Asserts that the result is not null, and that the product's name, description, and price match the request data.
     */
    @Test
    public void testCreateProductValidRequest() {
        // Arrange
        CreateProductRequest request = new CreateProductRequest();
        request.setName("New Product");
        request.setDescription("New Description");
        request.setPrice(100.0);
        request.setCategories(Arrays.asList("category1", "category2", "category3"));
        request.setImageIds(Arrays.asList(UUID.randomUUID().toString()));


        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(BigDecimal.valueOf(request.getPrice()));


        when(categoryRepository.findById(any(String.class))).thenReturn(Optional.of(new Category()));
        when(productImageRepository.findById(any(UUID.class))).thenReturn(Optional.of(new ProductImage()));
        when(productRepository.save(any(Product.class))).thenReturn(product);

        // Act
        Product result = productService.createProduct(request);

        // Assert
        assertNotNull(result);
        assertEquals("New Product", result.getName());
        assertEquals("New Description", result.getDescription());
        assertEquals(BigDecimal.valueOf(100.0), result.getPrice());
    }

    /**
     * Test for the `createProduct` method when the request has an invalid number of categories.
     * This test verifies that the method throws an IllegalArgumentException when the number of categories is not exactly 3.
     *
     * - Arranges a mock `CreateProductRequest` with an invalid number of categories.
     * - Mocks the behaviors of the category repository, product image repository, and product repository.
     * - Uses `when` to simulate the category and image repositories.
     * - Asserts that an IllegalArgumentException is thrown.
     */
    @Test
    public void testCreateProductInvalidNumberOfCategories() {

        // Arrange
        CreateProductRequest request = new CreateProductRequest();
        request.setName("New Product");
        request.setDescription("New Description");
        request.setPrice(100.0);
        request.setCategories(Arrays.asList("category1", "category2"));
        request.setImageIds(Arrays.asList(UUID.randomUUID().toString()));


        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(BigDecimal.valueOf(request.getPrice()));


        when(categoryRepository.findById(any(String.class))).thenReturn(Optional.of(new Category()));
        when(productImageRepository.findById(any(UUID.class))).thenReturn(Optional.of(new ProductImage()));
        when(productRepository.save(any(Product.class))).thenReturn(product);



        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> productService.createProduct(request));
    }

    /**
     * Test for the `createProduct` method when the request has null categories.
     * This test verifies that the method throws an IllegalArgumentException when the categories list is null.
     *
     * - Arranges a mock `CreateProductRequest` with null categories.
     * - Mocks the behaviors of the category repository, product image repository, and product repository.
     * - Uses `when` to simulate the category and image repositories.
     * - Asserts that an IllegalArgumentException is thrown.
     */
    @Test
    public void testCreateProductInvalidRequestNullCategories() {

        // Arrange
        CreateProductRequest request = new CreateProductRequest();
        request.setName("New Product");
        request.setDescription("New Description");
        request.setPrice(100.0);
        request.setImageIds(Arrays.asList(UUID.randomUUID().toString()));


        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(BigDecimal.valueOf(request.getPrice()));


        when(categoryRepository.findById(any(String.class))).thenReturn(Optional.of(new Category()));
        when(productImageRepository.findById(any(UUID.class))).thenReturn(Optional.of(new ProductImage()));
        when(productRepository.save(any(Product.class))).thenReturn(product);



        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> productService.createProduct(request));
    }


    /**
     * Test for the `createProduct` method when the request has null price.
     * This test verifies that the method throws a NullPointerException when the price is null.
     *
     * - Arranges a mock `CreateProductRequest` with null price.
     * - Mocks the behaviors of the category repository, product image repository, and product repository.
     * - Uses `when` to simulate the category and image repositories.
     * - Asserts that a NullPointerException is thrown.
     */
    @Test
    public void testCreateProductInvalidRequestNullPrice() {
        // Arrange: Crear un producto sin precio
        CreateProductRequest request = new CreateProductRequest();
        request.setName("New Product");
        request.setDescription("New Description");
        request.setCategories(Arrays.asList("category1", "category2", "category3"));
        request.setImageIds(Arrays.asList(UUID.randomUUID().toString()));


        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());


        when(categoryRepository.findById(any(String.class))).thenReturn(Optional.of(new Category()));
        when(productImageRepository.findById(any(UUID.class))).thenReturn(Optional.of(new ProductImage()));
        when(productRepository.save(any(Product.class))).thenReturn(product);

        // Act & Assert: Verificar que se lanza una excepción cuando el precio es negativo
        assertThrows(NullPointerException.class, () -> productService.createProduct(request));
    }

    /**
     * Test for the `createProduct` method when the request has no images.
     * This test verifies that the method throws an IllegalArgumentException when the image IDs list is empty.
     *
     * - Arranges a mock `CreateProductRequest` with no images.
     * - Mocks the behaviors of the category repository, product image repository, and product repository.
     * - Uses `when` to simulate the category and image repositories.
     * - Asserts that an IllegalArgumentException is thrown.
     */
    @Test
    public void testCreateProductNoImages() {
        // Arrange: Crear un producto mock sin imágenes
        CreateProductRequest request = new CreateProductRequest();
        request.setName("New Product");
        request.setDescription("New Description");
        request.setCategories(Arrays.asList("category1", "category2", "category3"));


        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());


        when(categoryRepository.findById(any(String.class))).thenReturn(Optional.of(new Category()));
        when(productImageRepository.findById(any(UUID.class))).thenReturn(Optional.of(new ProductImage()));
        when(productRepository.save(any(Product.class))).thenReturn(product);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> productService.createProduct(request));
    }
}

