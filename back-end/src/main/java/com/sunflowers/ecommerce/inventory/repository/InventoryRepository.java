package com.sunflowers.ecommerce.inventory.repository;

import com.sunflowers.ecommerce.inventory.entity.Inventory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends CrudRepository<Inventory, Long> {

    @Query(value = "SELECT DISTINCT size FROM inventory", nativeQuery = true)
    Iterable<String> findDistinctSizes();
}
