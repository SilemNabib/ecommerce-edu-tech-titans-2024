package com.sunflowers.ecommerce.product.controller;

import com.sunflowers.ecommerce.product.entity.Banner;
import com.sunflowers.ecommerce.product.service.BannerImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Controller for managing banner images.
 * This class handles HTTP requests related to banner images.
 */
@RestController
@RequestMapping("/api/v1/admin/banner")
public class BannerController {

    @Autowired
    private BannerImageService bannerService;

    /**
     * Endpoint for uploading a banner image.
     * This method handles POST requests for uploading a banner image.
     *
     * @param file the image file to be uploaded
     * @return a ResponseEntity containing the created Banner entity, or a FORBIDDEN status if an error occurred
     */
    @PostMapping("/")
    public ResponseEntity<Banner> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(bannerService.uploadImage(file));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }
}
