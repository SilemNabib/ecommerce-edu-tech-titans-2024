package com.sunflowers.ecommerce.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @Column(name = "id", nullable = false, length = 36)
    private String id;

    @Column(name = "creation_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @Column(name = "last_update", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastUpdate;

    @Column(name = "deleted")
    @Temporal(TemporalType.TIMESTAMP)
    private Date deleted;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private double price;

    @Column(name = "color_name", nullable = false, length = 32)
    private String colorName;

    @OneToMany(mappedBy = "product")
    private Set<Review> reviews;

    @OneToMany(mappedBy = "product")
    private Set<CartDetail> cartDetails;

    @OneToMany(mappedBy = "product")
    private Set<Inventory> inventories;

    @OneToMany(mappedBy = "product")
    private Set<ProductCategory> productCategories;

    @OneToMany(mappedBy = "product")
    private Set<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "product")
    private Set<ClothingSetProduct> clothingSetProducts;

    @OneToMany(mappedBy = "product")
    private Set<Image> images;





}
