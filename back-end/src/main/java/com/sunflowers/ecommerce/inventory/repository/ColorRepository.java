package com.sunflowers.ecommerce.inventory.repository;

import com.sunflowers.ecommerce.inventory.entity.Color;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorRepository extends CrudRepository<Color, String> {
}
