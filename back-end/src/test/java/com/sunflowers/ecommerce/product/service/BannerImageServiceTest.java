package com.sunflowers.ecommerce.product.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.sunflowers.ecommerce.product.entity.Banner;
import com.sunflowers.ecommerce.product.repository.BannerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.*;

@SpringBootTest
public class BannerImageServiceTest {
    @InjectMocks
    private BannerImageService bannerImageService;

    @Mock
    private BannerRepository bannerRepository;

    @Mock
    private ImageService imageService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    /**
     * Test for the `uploadImage` method.
     * This test verifies that the method successfully uploads an image and returns the saved image information.
     *
     * - Arranges a mock image file and mocks the image service upload and banner repository save behaviors.
     * - Uses `when` to simulate uploading the image and saving the banner.
     * - Asserts that the result is not null and contains the correct image URL.
     */
    @Test
    public void testUploadImage() throws IOException {
        // Arrange
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", "image/jpeg", "test image content".getBytes());
        Banner savedImage = new Banner();
        savedImage.setId(UUID.randomUUID());
        savedImage.setImageUrl("https://storage.googleapis.com/banners/test.jpg");

        when(bannerRepository.save(any(Banner.class))).thenReturn(savedImage);
        when(imageService.uploadImage(any(), any(), any()))
                .thenReturn("https://storage.googleapis.com/banners/test.jpg");

        // Act
        Banner result = bannerImageService.uploadImage(file);

        // Assert
        assertNotNull(result);
        assertNotNull(result.getId());
        assertEquals("https://storage.googleapis.com/banners/test.jpg", result.getImageUrl());
    }
}
