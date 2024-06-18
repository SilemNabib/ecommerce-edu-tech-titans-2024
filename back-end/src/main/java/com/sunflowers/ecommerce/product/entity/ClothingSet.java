package com.sunflowers.ecommerce.product.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * Entity class for the ClothingSet.
 * This class represents a clothing set which is associated with multiple products and images.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "clothing_set")
public class ClothingSet {

    @Id
    @Column(name = "id", nullable = false, length = 36)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "clothingSet", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ClothingSetProduct> clothingSetProducts;

    @OneToMany(mappedBy = "clothingSet", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ClothingSetImage> clothingSetImages;
}

