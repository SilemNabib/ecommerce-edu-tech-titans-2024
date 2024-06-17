package com.sunflowers.ecommerce.product.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "clothing_set_image")
public class ClothingSetImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "url", nullable = false)
    private String url;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "clothing_set", nullable = false)
    private ClothingSet clothingSet;

}

