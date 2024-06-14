package com.sunflowers.ecommerce.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "clothing_set")
public class ClothingSet {

    @Id
    @Column(name = "id", nullable = false, length = 36)
    private String id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "clothingSet")
    private Set<ClothingSetProduct> clothingSetProducts;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ClothingSetProduct> getClothingSetProducts() {
        return clothingSetProducts;
    }

    public void setClothingSetProducts(Set<ClothingSetProduct> clothingSetProducts) {
        this.clothingSetProducts = clothingSetProducts;
    }
}

