package com.sunflowers.ecommerce.product.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.google.cloud.storage.*;
import com.sunflowers.ecommerce.product.service.ImageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;

@SpringBootTest
public class ImageServiceTest {

    @InjectMocks
    private ImageService imageService;

    @Mock
    private Storage storage;

    @Mock
    private Blob blob;

    MockMultipartFile file;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        file = new MockMultipartFile("file", "test.jpg", "image/jpeg", "test image content".getBytes());
    }


    /**
     * Test for the `uploadImage` method when the image type is PRODUCT.
     * This test verifies that the method correctly uploads an image of type PRODUCT and returns the expected URL.
     *
     * - Arranges a mock image file and mocks the behavior of the storage service.
     * - Uses `when` to simulate the uploading process.
     * - Asserts that the result contains the "products" path, the correct filename, and starts with the expected URL prefix.
     *
     * @throws IOException if an I/O error occurs
     */
    @Test
    public void testUploadImageProduct() throws IOException {
        // Arrange
        //in SetUp


        // Act
        String result = imageService.uploadImage(file, ImageService.ImageType.PRODUCT, "test.jpg");

        // Assert
        assertTrue(result.contains("products"));
        assertTrue(result.contains("test.jpg"));
        assertTrue(result.startsWith("https://storage.googleapis.com/"));
    }

    /**
     * Test for the `uploadImage` method when the image type is CLOTHING_SET.
     * This test verifies that the method correctly uploads an image of type CLOTHING_SET and returns the expected URL.
     *
     * - Arranges a mock image file and mocks the behavior of the storage service.
     * - Uses `when` to simulate the uploading process.
     * - Asserts that the result contains the "clothing_set" path, the correct filename, and starts with the expected URL prefix.
     *
     * @throws IOException if an I/O error occurs
     */
    @Test
    public void testUploadImageClothingSet() throws IOException {
        // Arrange
        //in SetUp

        // Act
        String result = imageService.uploadImage(file, ImageService.ImageType.CLOTHING_SET, "test.jpg");

        // Assert
        assertTrue(result.contains("clothing_set"));
        assertTrue(result.contains("test.jpg"));
        assertTrue(result.startsWith("https://storage.googleapis.com/"));
    }

    /**
     * Test for the `uploadImage` method when the image type is BANNER.
     * This test verifies that the method correctly uploads an image of type BANNER and returns the expected URL.
     *
     * - Arranges a mock image file and mocks the behavior of the storage service.
     * - Uses `when` to simulate the uploading process.
     * - Asserts that the result contains the "banners" path, the correct filename, and starts with the expected URL prefix.
     *
     * @throws IOException if an I/O error occurs
     */
    @Test
    public void testUploadImageBanner() throws IOException {
        // Arrange
        //in SetUp

        // Act
        String result = imageService.uploadImage(file, ImageService.ImageType.BANNER, "test.jpg");

        // Assert
        assertTrue(result.contains("banners"));
        assertTrue(result.contains("test.jpg"));
        assertTrue(result.startsWith("https://storage.googleapis.com/"));
    }

}
