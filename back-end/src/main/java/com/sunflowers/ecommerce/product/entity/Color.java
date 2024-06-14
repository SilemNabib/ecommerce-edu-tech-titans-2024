package com.sunflowers.ecommerce.product.entity;

import com.sunflowers.ecommerce.inventory.entity.Inventory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

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
    private Set<Inventory> inventories;

}

