package com.sunflowers.ecommerce.product.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sunflowers.ecommerce.auth.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "review")
public class Review {

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Min(value = 1, message = "Rating must be greater than or equal to 1")
    @Max(value = 5, message = "Rating must be less than or equal to 5")
    @Column(name = "rating", nullable = false)
    private int rating;

    @Length(min = 5, max = 1000, message = "Comment must be less than 1000 characters")
    @Column(name = "comment", nullable = false)
    private String comment;

    @Column(name = "creation_date", nullable = false)
    private Timestamp creationDate;

}
