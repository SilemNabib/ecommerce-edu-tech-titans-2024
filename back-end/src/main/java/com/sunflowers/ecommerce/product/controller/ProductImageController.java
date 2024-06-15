package com.sunflowers.ecommerce.product.controller;

import com.google.cloud.storage.BlobId;
import com.sunflowers.ecommerce.product.service.ProductImageService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.services.storage.Storage;

import java.io.IOException;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/admin/product/image")
public class ProductImageController {

    @Autowired
    private ProductImageService productImageService;

    @PostMapping("/")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED)
                .contentType(MediaType.valueOf(Objects.requireNonNull(file.getContentType())))
                .body(productImageService.uploadImage(file));
    }
}
