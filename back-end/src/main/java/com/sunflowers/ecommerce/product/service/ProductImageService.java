package com.sunflowers.ecommerce.product.service;

import com.sunflowers.ecommerce.product.entity.ProductImage;
import com.sunflowers.ecommerce.product.repository.ProductImageRepository;
import com.sunflowers.ecommerce.utils.RepositoryUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ProductImageService {

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ImageService imageService;

    /**
     * Uploads a product image.
     *
     * @param file the image file to upload
     * @return the saved ProductImage entity
     * @throws IOException if an error occurs during file upload
     */
    @Transactional
    public ProductImage uploadImage(MultipartFile file) throws IOException {
        ProductImage image = productImageRepository.save(ProductImage.builder()
                .build());

        String fileName = image.getId() + "-" + file.getOriginalFilename();
        image.setUrl(imageService.uploadImage(file, ImageService.ImageType.PRODUCT, fileName));

        return productImageRepository.save(image);
    }

}
