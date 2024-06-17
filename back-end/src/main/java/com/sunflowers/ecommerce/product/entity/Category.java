package com.sunflowers.ecommerce.product.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "category")
public class Category {

    @Id
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @JsonIgnore
    @ManyToMany(mappedBy = "categories")
    private List<Product> products;


}

