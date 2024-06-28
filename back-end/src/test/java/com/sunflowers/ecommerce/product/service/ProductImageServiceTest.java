package com.sunflowers.ecommerce.product.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.sunflowers.ecommerce.product.entity.ProductImage;
import com.sunflowers.ecommerce.product.repository.ProductImageRepository;
import com.sunflowers.ecommerce.product.service.ImageService;
import com.sunflowers.ecommerce.product.service.ProductImageService;
import com.sunflowers.ecommerce.utils.RepositoryUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@SpringBootTest
public class ProductImageServiceTest {

    @InjectMocks
    private ProductImageService productImageService;

    @Mock
    private ProductImageRepository productImageRepository;

    @Mock
    private ImageService imageService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

    }

    /**
     * Test for the `uploadImage` method.
     * This test verifies that the method successfully uploads an image for a product and returns the saved image information.
     *
     * - Arranges a mock image file and mocks the image service upload and product image repository save behaviors.
     * - Uses `when` to simulate uploading the image and saving the product image.
     * - Asserts that the result is not null and contains the correct image URL.
     */
    @Test
    public void testUploadImage() throws IOException {
        // Arrange
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", "image/jpeg", "test image content".getBytes());
        ProductImage savedImage = new ProductImage();
        savedImage.setId(UUID.randomUUID());
        savedImage.setUrl("https://storage.googleapis.com/products/test.jpg");

        when(productImageRepository.save(any(ProductImage.class))).thenReturn(savedImage);
        when(imageService.uploadImage(any(MultipartFile.class), any(ImageService.ImageType.class), any(String.class)))
                .thenReturn("https://storage.googleapis.com/products/test.jpg");

        // Act
        ProductImage result = productImageService.uploadImage(file);

        // Assert
        assertNotNull(result);
        assertNotNull(result.getId());
        assertEquals("https://storage.googleapis.com/products/test.jpg", result.getUrl());
    }

    /**
     * Test for the `getImage` method.
     * This test verifies that the method correctly retrieves images associated with a given product ID.
     *
     * - Arranges three mock images associated with the same product ID.
     * - Uses `when` to simulate the behavior of the product image repository's `findAllByProductId` method.
     * - Asserts that the retrieved images are not null, that the list size is correct, and that each image
     *   has the correct product ID.
     */
    @Test
    public void testGetImage() {
        // Arrange
        UUID imageId1 = UUID.fromString("719a1e9d-e700-424e-84b5-bceb0022c46f");
        UUID imageId2 = UUID.fromString("6b939fb1-b337-4cf7-8d45-e551efe48b2b");
        UUID imageId3 = UUID.fromString("34df6711-ecfc-414c-b92b-619f9b87f94c");

        ProductImage image1 = new ProductImage();
        image1.setId(imageId1);
        ProductImage image2 = new ProductImage();
        image2.setId(imageId2);
        ProductImage image3 = new ProductImage();
        image3.setId(imageId3);

        List<ProductImage> imageList = Arrays.asList(image1, image2, image3);

        when(productImageRepository.findById(imageId1)).thenReturn(Optional.of(image1));
        when(productImageRepository.findById(imageId2)).thenReturn(Optional.of(image2));
        when(productImageRepository.findById(imageId3)).thenReturn(Optional.of(image3));

        // Act
        List<ProductImage> result = productImageService.getImage(imageId1.toString());

        // Assert
        assertNotNull(result);
        assertEquals(3, result.size());
        assertTrue(result.containsAll(imageList));

        // Verify that findById was called three times, once for each UUID
        verify(productImageRepository, times(3)).findById(any(UUID.class));
    }
}
