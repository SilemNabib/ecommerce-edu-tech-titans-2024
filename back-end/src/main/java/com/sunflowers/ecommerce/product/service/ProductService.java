package com.sunflowers.ecommerce.product.service;

import com.sunflowers.ecommerce.product.entity.Product;
import com.sunflowers.ecommerce.product.entity.Category;
import com.sunflowers.ecommerce.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Service class for performing operations on Product entities.
 */
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getProducts(int page, int size, String sortBy, List<String> categoryNames) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        if (categoryNames != null && !categoryNames.isEmpty() && categoryNames.size() <= 3) {
            Page<Product> productsPage = productRepository.findDistinctByCategoriesNameInAndCategoriesNameIsNotNull(categoryNames, pageable);
            List<Product> filteredProducts = productsPage.stream()
                    .map(product -> {
                        Set<String> productCategoryNames = new HashSet<>(product.getCategories().stream()
                                .map(Category::getName)
                                .toList());
                        if (productCategoryNames.containsAll(categoryNames)) {
                            return product;
                        } else {
                            return null;
                        }
                    })
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
            return new PageImpl<>(filteredProducts, pageable, filteredProducts.size());
        } else {
            return productRepository.findAll(pageable);
        }
    }
}
