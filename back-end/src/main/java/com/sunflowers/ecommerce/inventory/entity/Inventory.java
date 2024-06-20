package com.sunflowers.ecommerce.inventory.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sunflowers.ecommerce.product.entity.Product;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "inventory", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"product_id", "color_name", "size"})
})
@JsonIgnoreProperties({"product"})
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne()
    @JoinColumn(name = "color_name", nullable = false)
    private Color color;

    @Column(name = "size", nullable = false, length = 32)
    private String size;

    @Column(name = "stock", nullable = false)
    @Min(value = 0, message = "Stock must be greater than or equal to 0")
    private Integer stock;

}