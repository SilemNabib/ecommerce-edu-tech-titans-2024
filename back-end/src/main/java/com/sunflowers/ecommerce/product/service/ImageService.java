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
 * Service class for managing images.
 * This class provides methods to upload an image to Google Cloud Storage and to get the URL of the uploaded image.
 */
@Service
public class ImageService {

    private static final String BUCKET_NAME = "e-commerce-encora";

    /**
     * Enum for the types of images that can be uploaded.
     */
    public enum ImageType {
        PRODUCT,
        CLOTHING_SET,
        BANNER
    }

    /**
     * Uploads an image file to Google Cloud Storage.
     * The image file is saved with a name that includes the type of the image and the provided file name.
     * The URL of the saved image file is returned.
     *
     * @param file the image file to upload
     * @param type the type of the image
     * @param fileName the name to save the image file with
     * @return the URL of the uploaded image
     * @throws IOException if an I/O error occurs while handling the image file
     */
    public String uploadImage(MultipartFile file, ImageType type, String fileName) throws IOException {
        BlobId blobId = BlobId.of(BUCKET_NAME, getPrefix(type) + fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();

        Blob blob = storage().create(blobInfo, file.getBytes());

        return blob.getMediaLink();
    }

    /**
     * Gets the prefix for the file name based on the type of the image.
     *
     * @param imageType the type of the image
     * @return the prefix for the file name
     */
    private String getPrefix(ImageType imageType) {
        return switch (imageType) {
            case PRODUCT -> "products/";
            case CLOTHING_SET -> "clothing_set/";
            case BANNER -> "banners/";
        };
    }

    /**
     * Creates a new Storage instance for interacting with Google Cloud Storage.
     * The Storage instance is configured with the project ID and the credentials from a JSON file.
     *
     * @return the new Storage instance
     * @throws IOException if an I/O error occurs while reading the credentials file
     */
    @Bean
    private Storage storage() throws IOException {
        return StorageOptions.newBuilder()
                .setProjectId("e-commerce-encora")
                .setCredentials(GoogleCredentials.fromStream(new
                        FileInputStream(Paths.get("credentials.json").toAbsolutePath().toString()))).build().getService();
    }
}