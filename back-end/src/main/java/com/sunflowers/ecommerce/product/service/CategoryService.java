package com.sunflowers.ecommerce.product.service;

import com.sunflowers.ecommerce.product.entity.Category;
import com.sunflowers.ecommerce.product.repository.CategoryRepository;
import com.sunflowers.ecommerce.product.request.CreateCategoryRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for managing product categories.
 */
@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * Creates a list of categories.
     *
     * @param categories the list of categories to create
     * @return an Iterable collection of the created categories
     */
    public Iterable<Category> createCategories(List<CreateCategoryRequest> categories) {
        return categoryRepository.saveAll(categories.stream()
                .map(category -> Category.builder()
                        .name(category.getName())
                        .description(category.getDescription())
                        .build())
                .collect(Collectors.toList()));
    }
}
