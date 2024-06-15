package com.sunflowers.ecommerce.product.service;

import com.sunflowers.ecommerce.product.entity.Product;
import com.sunflowers.ecommerce.product.entity.Category;
import com.sunflowers.ecommerce.product.repository.ProductRepository;
import com.sunflowers.ecommerce.product.request.ProductRequest;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

/**
 * Service class for performing operations on Product entities.
 */
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getProducts(ProductRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), Sort.by(request.getSortBy()));
        Specification<Product> spec = Specification.where(null);

        if (request.getMinPrice() != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get("price"), request.getMinPrice()));
        }

        if (request.getMaxPrice() != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.lessThanOrEqualTo(root.get("price"), request.getMaxPrice()));
        }

        if (request.getCategories() != null && !request.getCategories().isEmpty()) {
            for (String category : request.getCategories()) {
                spec = spec.and((root, query, criteriaBuilder) -> {
                    Join<Product, Category> join = root.join("categories", JoinType.INNER);
                    return criteriaBuilder.equal(join.get("name"), category);
                });
            }
        }

        return productRepository.findAll(spec, pageable);
    }
}
