package com.sunflowers.ecommerce.inventory.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "color")
public class Color {

    @Id
    @Column(name = "name", nullable = false, length = 32)
    private String name;

    @Column(name = "code", nullable = false, length = 6)
    private String code;

    @OneToMany(mappedBy = "color", cascade = CascadeType.ALL, orphanRemoval = true)
    private HashSet<Inventory> inventories;

}

