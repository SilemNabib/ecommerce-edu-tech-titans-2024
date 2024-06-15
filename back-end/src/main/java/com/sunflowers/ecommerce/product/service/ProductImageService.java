package com.sunflowers.ecommerce.product.service;

import com.sunflowers.ecommerce.product.entity.ProductImage;
import com.sunflowers.ecommerce.product.repository.ProductImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class ProductImageService {

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ImageService imageService;

    @Transactional
    public ProductImage uploadImage(MultipartFile file) throws IOException {
        ProductImage image = productImageRepository.save(ProductImage.builder()
                .build());

        String fileName = image.getId() + "-" + file.getOriginalFilename();
        image.setUrl(imageService.uploadImage(file, ImageService.ImageType.PRODUCT, fileName));

        return productImageRepository.save(image);
    }
}
