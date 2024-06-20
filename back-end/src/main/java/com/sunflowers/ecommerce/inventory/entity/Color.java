package com.sunflowers.ecommerce.inventory.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "color")
@JsonIgnoreProperties({"inventories"})
public class Color {

    @Id
    @Column(name = "name", nullable = false, length = 32)
    private String name;

    @Column(name = "code", nullable = false, length = 7)
    @Size(min = 7, max = 7, message = "Color code must be exactly 6 characters long")
    @Pattern(regexp = "^#([A-F0-9]{6}|[A-F0-9]{3})$", message = "Color code must be a valid HTML color code")
    private String code;

    @OneToMany(mappedBy = "color", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Inventory> inventories;

}
