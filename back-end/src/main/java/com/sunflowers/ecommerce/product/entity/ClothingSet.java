package com.sunflowers.ecommerce.product.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;

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
    private HashSet<ClothingSetProduct> clothingSetProducts;

    @OneToMany(mappedBy = "clothingSet", cascade = CascadeType.ALL, orphanRemoval = true)
    private HashSet<ClothingSetImage> clothingSetImages;
}

