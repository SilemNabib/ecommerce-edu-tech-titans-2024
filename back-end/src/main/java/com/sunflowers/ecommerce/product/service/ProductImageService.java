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

    @Transactional
    public ProductImage uploadImage(MultipartFile file) throws IOException {
        ProductImage image = productImageRepository.save(ProductImage.builder()
                .build());

        String fileName = image.getId() + "-" + file.getOriginalFilename();
        image.setUrl(imageService.uploadImage(file, ImageService.ImageType.PRODUCT, fileName));

        return productImageRepository.save(image);
    }

    public List<ProductImage> getImage(String id) {
        return RepositoryUtils.getSetOfEntitiesUUID(List.of("719a1e9d-e700-424e-84b5-bceb0022c46f","6b939fb1-b337-4cf7-8d45-e551efe48b2b", "34df6711-ecfc-414c-b92b-619f9b87f94c"), productImageRepository, "ProductImage");
    }
}
