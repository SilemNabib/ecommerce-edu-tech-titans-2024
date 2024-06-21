package com.sunflowers.ecommerce.product.service;

import com.sunflowers.ecommerce.inventory.entity.Inventory;
import com.sunflowers.ecommerce.product.entity.Product;
import com.sunflowers.ecommerce.product.entity.Category;
import com.sunflowers.ecommerce.product.entity.ProductImage;
import com.sunflowers.ecommerce.product.repository.CategoryRepository;
import com.sunflowers.ecommerce.product.repository.ProductImageRepository;
import com.sunflowers.ecommerce.product.repository.ProductRepository;
import com.sunflowers.ecommerce.product.request.CreateProductRequest;
import com.sunflowers.ecommerce.product.request.ProductRequest;
import com.sunflowers.ecommerce.utils.RepositoryUtils;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * Service class for performing operations on Product entities.
 */
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    /**
     * Retrieves a list of Product entities based on the provided request.
     * The request can contain search criteria such as price range, categories, sizes, and colors.
     * The products are returned in a Page object, which contains the entities for the current page and metadata.
     *
     * @param request the request containing the search criteria
     * @return a Page containing the Product entities that match the search criteria
     */
    public Page<Product> getProducts(ProductRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getPageSize(), Sort.by(request.getSortBy()));

        Specification<Product> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            predicates.add(cb.isNull(root.get("deleted")));

            if (request.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), request.getMinPrice()));
            }
            if (request.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), request.getMaxPrice()));
            }

            if (request.getCategories() != null && !request.getCategories().isEmpty()) {
                Join<Product, Category> join = root.join("categories", JoinType.INNER);
                Predicate categoryPredicate = join.get("name").in(request.getCategories());
                predicates.add(categoryPredicate);
                query.groupBy(root.get("id"));
                query.having(cb.equal(cb.count(root.get("id")), request.getCategories().size()));
            }

            if (request.getSizes() != null && !request.getSizes().isEmpty()) {
                Join<Product, Inventory> inventoryJoin = root.join("inventories", JoinType.INNER);
                Predicate sizePredicate = inventoryJoin.get("size").in(request.getSizes());
                predicates.add(sizePredicate);
            }

            if (request.getColors() != null && !request.getColors().isEmpty()) {
                Join<Product, Inventory> inventoryJoin = root.join("inventories", JoinType.INNER);
                Predicate colorPredicate = inventoryJoin.get("color_id").in(request.getColors());
                predicates.add(colorPredicate);
            }

            if (request.getName() != null && !request.getName().isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("name")), "%" + request.getName().toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return productRepository.findAll(spec, pageable);
    }

    /**
     * Retrieves a Product entity by its ID.
     * The product must not be a deleted product.
     *
     * @param id the ID of the product
     * @return the Product entity if found, or null if not found
     */
    public Product getProductById(Long id) {
        Product product = productRepository.findById(id).orElse(null);

        if (product == null || product.getDeleted() != null) {
            return null;
        }

        return product;
    }

    /**
     * Creates a new Product entity.
     * The request must contain exactly 3 categories and at least one image.
     * The categories and images must exist in the database.
     * The product is created with the current timestamp as the creation date and last update date.
     * The discount is set to null.
     * The product is not deleted.
     * The price is set to the provided value.
     *
     * @param request the request containing the product details
     * @return the created Product entity
     */
    @Transactional
    public Product createProduct(CreateProductRequest request) {
        if (request.getCategories() == null || request.getCategories().size() != 3) {
            throw new IllegalArgumentException("Exactly 3 categories are required");
        }

        if (request.getImageIds() == null || request.getImageIds().isEmpty()) {
            throw new IllegalArgumentException("At least one image is required");
        }

        Product product = Product.builder()
                .lastUpdate(new Timestamp(System.currentTimeMillis()))
                .creationDate(new Timestamp(System.currentTimeMillis()))
                .deleted(null)
                .discount(null)
                .name(request.getName())
                .description(request.getDescription())
                .price(BigDecimal.valueOf(request.getPrice()))
                .categories(RepositoryUtils.getListOfEntities(request.getCategories(), categoryRepository,"Category"))
                .build();

        List<ProductImage> images = RepositoryUtils.getListOfEntitiesUUID(request.getImageIds(), productImageRepository,"ProductImage");

        for(ProductImage image : images) {
            image.setProduct(product);
            productImageRepository.save(image);
        }

        return productRepository.save(product);
    }
}
