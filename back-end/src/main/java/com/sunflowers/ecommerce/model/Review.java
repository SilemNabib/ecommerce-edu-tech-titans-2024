package com.sunflowers.ecommerce.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "review")
public class Review {

    @EmbeddedId
    private ReviewId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product Product;

    @Column(name = "rating", nullable = false)
    private int rating;

    @Column(name = "comment", nullable = true)
    private String comment;

    @Column(name = "creation_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date creationDate;



}
