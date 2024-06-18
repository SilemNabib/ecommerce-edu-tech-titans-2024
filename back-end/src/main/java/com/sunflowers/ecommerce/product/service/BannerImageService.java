package com.sunflowers.ecommerce.product.service;

import com.sunflowers.ecommerce.product.entity.Banner;
import com.sunflowers.ecommerce.product.repository.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Service class for managing Banner images.
 * This class provides methods to upload a new image to a Banner and to get all active Banners.
 */
@Service
public class BannerImageService {

    @Autowired
    private BannerRepository bannerImageRepository;

    @Autowired
    private ImageService imageService;

    /**
     * Uploads an image file to a new Banner.
     * The image file is saved with a name that includes the ID of the new Banner.
     * The URL of the saved image file is set as the image URL of the Banner.
     * The new Banner is saved to the repository and returned.
     *
     * @param file the image file to upload
     * @return the new Banner with the uploaded image
     * @throws IOException if an I/O error occurs while handling the image file
     */
    @Transactional
    public Banner uploadImage(MultipartFile file) throws IOException {
        Banner image = bannerImageRepository.save(Banner.builder()
                .build());

        String fileName = image.getId() + "-" + file.getOriginalFilename();
        image.setImageUrl(imageService.uploadImage(file, ImageService.ImageType.BANNER, fileName));

        return bannerImageRepository.save(image);
    }

    /**
     * Gets all active Banners.
     * An active Banner is one that has not been deleted.
     *
     * @return an Iterable of all active Banners
     */
    public Iterable<Banner> getActive() {
        Specification<Banner> spec = (root, query, cb) -> cb.equal(root.get("deleted"), null);
        return bannerImageRepository.findAll();
    }
}
