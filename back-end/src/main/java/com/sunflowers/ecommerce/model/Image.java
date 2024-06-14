package com.sunflowers.ecommerce.model;

import jakarta.persistence.*;

@Entity
@Table(name = "image")
public class Image {

    @Id
    @Column(name = "id", nullable = false, length = 36)
    private String id;

    @Column(name = "url", nullable = false, length = 255)
    private String url;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;


}

