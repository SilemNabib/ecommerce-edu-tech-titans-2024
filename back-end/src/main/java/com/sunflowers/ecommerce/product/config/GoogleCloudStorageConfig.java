package com.sunflowers.ecommerce.product.config;

import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GoogleCloudStorageConfig {

    /**
     * Creates a Google Cloud Storage bean.
     *
     * @return a Storage instance configured with the default options
     */
    @Bean
    public Storage googleCloudStorage() {
        return StorageOptions.getDefaultInstance().getService();
    }
}