package com.sunflowers.ecommerce.product.service;

import com.sunflowers.ecommerce.product.entity.Category;
import com.sunflowers.ecommerce.product.repository.CategoryRepository;
import com.sunflowers.ecommerce.product.request.CreateCategoryRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }


    /**
     * Test for the `createCategories` method with a valid request.
     * This test verifies that the method successfully creates categories when provided with valid data.
     *
     * - Arranges a list of valid category creation requests and mocks the category repository save behavior.
     * - Uses `when` to simulate saving the categories.
     * - Asserts that the result is not null and has the correct number of categories.
     * - Verifies interaction with the category repository.
     */
    @Test
    public void testCreateCategoriesValidRequest() {
        // Arrange
        List<CreateCategoryRequest> requests = Arrays.asList(
                new CreateCategoryRequest("Category 1", "Description 1"),
                new CreateCategoryRequest("Category 2", "Description 2")
        );

        List<Category> categories = requests.stream()
                .map(request -> Category.builder()
                        .name(request.getName())
                        .description(request.getDescription())
                        .build())
                .collect(Collectors.toList());

        when(categoryRepository.saveAll(any())).thenReturn(categories);

        // Act
        Iterable<Category> result = categoryService.createCategories(requests);

        // Assert
        assertNotNull(result);
        assertEquals(2, ((List<Category>) result).size());
        verify(categoryRepository, times(1)).saveAll(any());
    }

    /**
     * Test for the `createCategories` method with an empty request.
     * This test verifies that the method handles an empty request correctly.
     *
     * - Arranges an empty list of category creation requests and mocks the category repository save behavior.
     * - Uses `when` to simulate saving the categories.
     * - Asserts that the result is not null and is empty.
     * - Verifies interaction with the category repository.
     */
    @Test
    public void testCreateCategoriesEmptyRequest() {
        // Arrange
        List<CreateCategoryRequest> requests = Arrays.asList();

        List<Category> categories = requests.stream()
                .map(request -> Category.builder()
                        .name(request.getName())
                        .description(request.getDescription())
                        .build())
                .collect(Collectors.toList());

        when(categoryRepository.saveAll(any())).thenReturn(categories);

        // Act
        Iterable<Category> result = categoryService.createCategories(requests);

        // Assert
        assertNotNull(result);
        assertTrue(((List<Category>) result).isEmpty());
        verify(categoryRepository, times(1)).saveAll(any());
    }

}
