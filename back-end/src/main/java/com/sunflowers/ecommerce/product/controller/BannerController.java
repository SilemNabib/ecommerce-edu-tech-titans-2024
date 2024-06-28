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
 * Provides endpoints for uploading banner images.
 */
@RestController
@RequestMapping("/api/v1/admin/banner")
public class BannerController {

    @Autowired
    private BannerImageService bannerService;

    /**
     * Uploads a new banner image.
     * Banners are initial web pages promo images that are displayed to users when they visit a website.
     *
     * @param file the multipart file containing the banner image
     * @return a ResponseEntity containing the created Banner object and HTTP status code
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
