package com.sunflowers.ecommerce.product.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "clothing_set_image")
public class ClothingSetImage {

    @Id
    @Column(name = "id", nullable = false, length = 36)
    private String id;

    @Column(name = "url", nullable = false)
    private String url;

    @ManyToOne
    @JoinColumn(name = "clothing_set", nullable = false)
    private ClothingSet clothingSet;

}

