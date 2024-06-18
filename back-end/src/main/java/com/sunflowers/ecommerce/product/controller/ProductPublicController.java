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
 * This controller provides endpoints for fetching products and active banners.
 */
@RestController
@RequestMapping("/api/v1/product")
public class ProductPublicController {

    @Autowired
    private ProductService productService;

    @Autowired
    private BannerImageService bannerService;

    /**
     * Endpoint for fetching products.
     * This method handles GET requests for fetching products.
     *
     * @param productRequest the request containing product details
     * @param assembler the paged resources assembler
     * @return a ResponseEntity containing a paged model of products
     */
    @GetMapping("/")
    public ResponseEntity<PagedModel<EntityModel<Product>>> getProducts(@ModelAttribute ProductRequest productRequest,
                                                                        PagedResourcesAssembler<Product> assembler) {
        Page<Product> products = productService.getProducts(productRequest);
        return ResponseEntity.ok(assembler.toModel(products));
    }

    /**
     * Endpoint for fetching a product by its ID.
     * This method handles GET requests for fetching a product by its ID.
     *
     * @param id the ID of the product
     * @return a ResponseEntity containing the product, or a NOT_FOUND status if the product is not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable(name = "id") Long id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Endpoint for fetching active banners.
     * This method handles GET requests for fetching active banners.
     *
     * @return a ResponseEntity containing an iterable list of banners
     */
    @GetMapping("/banner")
    public ResponseEntity<Iterable<Banner>> getActiveBanners() {
        return ResponseEntity.ok(bannerService.getActive());
    }

    /**
     * Exception handler.
     * This method handles general exceptions and returns a ResponseEntity with a 500 status and the exception message.
     *
     * @param e the exception
     * @return a ResponseEntity with a 500 status and the exception message
     */
    @ExceptionHandler
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(500).body(e.getMessage());
    }
}
