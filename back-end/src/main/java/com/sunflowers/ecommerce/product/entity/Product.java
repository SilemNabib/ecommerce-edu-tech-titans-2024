package com.sunflowers.ecommerce.product.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.sunflowers.ecommerce.inventory.entity.Inventory;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.Formula;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
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
    private Integer id;

    @JsonIgnore
    @Column(name = "creation_date", nullable = false)
    private Timestamp creationDate;

    @JsonIgnore
    @Column(name = "last_update", nullable = false)
    private Timestamp lastUpdate;

    @JsonIgnore
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

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Inventory> inventories;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "product_category",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "product_clothing_set",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "clothing_set_id")
    )
    private List<ClothingSet> clothingSets;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> productImages;

    @Formula("(select avg(r.rating) from Review r where r.product_id = id)")
    private Double rating;
}
