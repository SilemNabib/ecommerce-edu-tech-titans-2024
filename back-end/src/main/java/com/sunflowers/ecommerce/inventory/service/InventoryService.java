package com.sunflowers.ecommerce.inventory.service;

import com.sunflowers.ecommerce.inventory.entity.Color;
import com.sunflowers.ecommerce.inventory.repository.ColorRepository;
import com.sunflowers.ecommerce.inventory.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private ColorRepository colorRepository;

    public Iterable<Color> getUniqueColors() {
        return colorRepository.findAll();
    }

    public Iterable<String> getUniqueSizes() {
        return inventoryRepository.findDistinctSizes();
    }
}
