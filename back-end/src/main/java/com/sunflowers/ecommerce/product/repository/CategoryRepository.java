package com.sunflowers.ecommerce.product.repository;

import com.sunflowers.ecommerce.product.entity.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for performing CRUD operations on Category entities.
 */
@Repository
public interface CategoryRepository extends CrudRepository<Category, String> {

}
