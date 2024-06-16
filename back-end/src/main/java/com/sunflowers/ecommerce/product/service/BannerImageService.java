package com.sunflowers.ecommerce.product.service;

import com.sunflowers.ecommerce.product.entity.Banner;
import com.sunflowers.ecommerce.product.repository.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class BannerImageService {

    @Autowired
    private BannerRepository bannerImageRepository;

    @Autowired
    private ImageService imageService;

    @Transactional
    public Banner uploadImage(MultipartFile file) throws IOException {
        Banner image = bannerImageRepository.save(Banner.builder()
                .build());

        String fileName = image.getId() + "-" + file.getOriginalFilename();
        image.setImageUrl(imageService.uploadImage(file, ImageService.ImageType.BANNER, fileName));

        return bannerImageRepository.save(image);
    }

    public Iterable<Banner> getActive() {
        Specification<Banner> spec = (root, query, cb) -> cb.equal(root.get("deleted"), null);
        return bannerImageRepository.findAll();
    }
}
