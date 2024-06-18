package com.sunflowers.ecommerce.product.service;

import com.sunflowers.ecommerce.product.entity.ProductImage;
import com.sunflowers.ecommerce.product.repository.ProductImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

/**
 * Service class for managing Product images.
 * This class provides methods to upload an image to a Product and to get all active Products.
 */
@Service
public class ProductImageService {

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ImageService imageService;

    /**
     * Uploads an image file to a new Product.
     * The image file is saved with a name that includes the ID of the new Product.
     * The URL of the saved image file is set as the image URL of the Product.
     * The new Product is saved to the repository and returned.
     *
     * @param file the image file to upload
     * @return the new Product with the uploaded image
     * @throws IOException if an I/O error occurs while handling the image file
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
