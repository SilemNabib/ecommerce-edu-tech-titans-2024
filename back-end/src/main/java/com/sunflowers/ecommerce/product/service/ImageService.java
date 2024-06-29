package com.sunflowers.ecommerce.product.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Paths;

/**
 * Service class for uploading images to Google Cloud Storage.
 */
@Service
public class ImageService {

    private static final String BUCKET_NAME = "e-commerce-encora";

    public enum ImageType {
        PRODUCT,
        CLOTHING_SET,
        BANNER
    }

    /**
     * Uploads an image to Google Cloud Storage.
     *
     * @param file the image file to upload
     * @param type the type of the image (e.g., product, banner)
     * @param fileName the name of the file
     * @return the URL of the uploaded image
     * @throws IOException if an error occurs during file upload
     */
    public String uploadImage(MultipartFile file, ImageType type, String fileName) throws IOException {
        BlobId blobId = BlobId.of(BUCKET_NAME, getPrefix(type) + fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();

        Blob blob = storage().create(blobInfo, file.getBytes());

        return blob.getMediaLink();
    }

    private String getPrefix(ImageType imageType) {
        return switch (imageType) {
            case PRODUCT -> "products/";
            case CLOTHING_SET -> "clothing_set/";
            case BANNER -> "banners/";
        };
    }

    @Bean
    private Storage storage() throws IOException {
        return StorageOptions.newBuilder()
                .setProjectId("e-commerce-encora")
                .setCredentials(GoogleCredentials.fromStream(new
                        FileInputStream(Paths.get("credentials.json").toAbsolutePath().toString()))).build().getService();
    }
}