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

    /**
     * Retrieves a paginated list of products based on the specified request parameters.
     *
     * @param productRequest the request parameters for filtering products
     * @param assembler the assembler to convert Page into PagedModel
     * @return a ResponseEntity containing a PagedModel of Product entities
     */
    @GetMapping("/")
    public ResponseEntity<PagedModel<EntityModel<Product>>> getProducts(@ModelAttribute ProductRequest productRequest,
                                                                        PagedResourcesAssembler<Product> assembler) {
        Page<Product> products = productService.getProducts(productRequest);
        return ResponseEntity.ok(assembler.toModel(products));
    }

    /**
     * Retrieves a product by its ID.
     *
     * @param id the ID of the product
     * @return a ResponseEntity containing the Product entity or a 404 status if not found
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
     * Retrieves a list of active banners.
     *
     * @return a ResponseEntity containing an Iterable of Banner entities
     */
    @GetMapping("/banner")
    public ResponseEntity<Iterable<Banner>> getActiveBanners() {
        return ResponseEntity.ok(bannerService.getActive());
    }

    /**
     * Handles exceptions thrown by the controller.
     *
     * @param e the exception that was thrown
     * @return a ResponseEntity containing the exception message and a 500 status code
     */
    @ExceptionHandler
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(500).body(e.getMessage());
    }
}
