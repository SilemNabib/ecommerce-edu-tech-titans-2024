package com.sunflowers.ecommerce.product.controller;

import com.sunflowers.ecommerce.product.entity.Banner;
import com.sunflowers.ecommerce.product.entity.Product;
import com.sunflowers.ecommerce.product.request.ProductRequest;
import com.sunflowers.ecommerce.product.service.BannerImageService;
import com.sunflowers.ecommerce.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for handling product-related HTTP requests.
 */
@RestController
@RequestMapping("/api/v1/product")
public class ProductPublicController {

    @Autowired
    private ProductService productService;

    @Autowired
    private BannerImageService bannerService;

    @GetMapping("/")
    public ResponseEntity<PagedModel<EntityModel<Product>>> getProducts(@ModelAttribute ProductRequest productRequest,
                                                                        PagedResourcesAssembler<Product> assembler) {
        Page<Product> products = productService.getProducts(productRequest);
        return ResponseEntity.ok(assembler.toModel(products));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable(name = "id") Long id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/banner")
    public ResponseEntity<Iterable<Banner>> getActiveBanners() {
        return ResponseEntity.ok(bannerService.getActive());
    }

    @ExceptionHandler
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(500).body(e.getMessage());
    }
}
