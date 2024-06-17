package com.sunflowers.ecommerce.product.entity;

import com.sunflowers.ecommerce.inventory.entity.Inventory;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.Formula;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Set;

@Getter
@Setter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "creation_date", nullable = false)
    private Timestamp creationDate;

    @Column(name = "last_update", nullable = false)
    private Timestamp lastUpdate;

    @Column(name = "deleted")
    private Timestamp deleted;

    @Column(name = "name", nullable = false)
    @NotBlank(message = "Product name is mandatory")
    private String name;

    @Column(name = "description")
    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;

    @Column(name = "discount", precision = 5, scale = 2)
    @DecimalMin(value = "0.00", inclusive = false, message = "Discount must be greater than 0.00")
    @DecimalMax(value = "100.00", message = "Discount must be less than or equal to 100.00")
    private BigDecimal discount;

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.00", message = "Price must be greater than or equal to 0.00")
    private BigDecimal price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Inventory> inventories;

    @ManyToMany
    @JoinTable(
            name = "product_category",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ClothingSetProduct> clothingSetProducts;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProductImage> productImages;

    @Formula("(select avg(r.rating) from Review r where r.product_id = id)")
    private Double rating;
}
