package com.sunflowers.ecommerce.product.service;

import com.google.cloud.storage.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {

    private static final String BUCKET_NAME = "e-commerce-encora";

    @Autowired
    private Storage storage;

    public enum ImageType {
        PRODUCT,
        CLOTHING_SET
    }

    public String uploadImage(MultipartFile file, ImageType type, String fileName) throws IOException {
        BlobId blobId = BlobId.of(BUCKET_NAME, getPrefix(type) + fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();

        Blob blob = storage.create(blobInfo, file.getBytes());

        return blob.getMediaLink();
    }

    private String getPrefix(ImageType imageType) {
        return switch (imageType) {
            case PRODUCT -> "products/";
            case CLOTHING_SET -> "clothing_set/";
        };
    }
}