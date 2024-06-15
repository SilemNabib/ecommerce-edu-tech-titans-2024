package com.sunflowers.ecommerce.product.controller;

import com.sunflowers.ecommerce.product.entity.Product;
import com.sunflowers.ecommerce.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller for handling product-related HTTP requests.
 */
@RestController
@RequestMapping("/api/v1/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public Page<Product> getProducts(@RequestParam(defaultValue = "0", name ="page") int page,
                                     @RequestParam(defaultValue = "10", name = "size") int size,
                                     @RequestParam(defaultValue = "name", name = "sortBy") String sortBy,
                                     @RequestParam(required = false, name = "categories") List<String> categoryNames) {
        return productService.getProducts(page, size, sortBy, categoryNames);
    }


}
