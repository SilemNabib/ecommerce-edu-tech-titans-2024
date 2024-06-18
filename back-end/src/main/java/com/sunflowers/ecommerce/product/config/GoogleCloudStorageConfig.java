package com.sunflowers.ecommerce.product.config;

import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration for Google Cloud Storage.
 * This class provides a bean for interacting with Google Cloud Storage.
 */
@Configuration
public class GoogleCloudStorageConfig {

    /**
     * Bean for interacting with Google Cloud Storage.
     * This method returns an instance of Google Cloud's storage service.
     *
     * @return an instance of Google Cloud's storage service
     */
    @Bean
    public Storage googleCloudStorage() {
        return StorageOptions.getDefaultInstance().getService();
    }
}