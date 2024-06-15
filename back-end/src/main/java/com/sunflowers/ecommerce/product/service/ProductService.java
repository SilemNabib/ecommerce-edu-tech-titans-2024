package com.sunflowers.ecommerce.product.service;

import com.sunflowers.ecommerce.product.entity.Product;
import com.sunflowers.ecommerce.product.entity.Category;
import com.sunflowers.ecommerce.product.repository.ProductRepository;
import com.sunflowers.ecommerce.product.request.ProductRequest;
import com.sunflowers.ecommerce.utils.EntitySpecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

/**
 * Service class for performing operations on Product entities.
 */
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getProducts(ProductRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getPageSize(), Sort.by(request.getSortBy()));

        Specification<Product> spec = Specification.where(EntitySpecs.<Timestamp, Product>hasAttribute("deleted", null))
                .and(EntitySpecs.hasAttributeGraterThan("price", request.getMinPrice()))
                .and(EntitySpecs.hasAttributeLessThan("price",request.getMaxPrice()))
                .and(EntitySpecs.<String, Product, Category>hasAllElements("categories", "name", request.getCategories()))
                .and(EntitySpecs.hasAnyElement("inventories", "size", request.getSizes()))
                .and(EntitySpecs.hasAnyElement("inventories", "color_id", request.getColors()));

        return productRepository.findAll(spec, pageable);
    }

    public Product getProductById(Long id) {
        Product product = productRepository.findById(id).orElse(null);

        if (product == null || product.getDeleted() != null) {
            return null;
        }

        return product;
    }

}
