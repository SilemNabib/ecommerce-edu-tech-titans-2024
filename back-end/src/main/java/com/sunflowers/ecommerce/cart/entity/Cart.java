package com.sunflowers.ecommerce.cart.entity;

import com.sunflowers.ecommerce.auth.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Set;
import java.util.UUID;

/**
 * The Cart entity represents a user's shopping cart in the e-commerce system.
 * It includes details such as the user, the creation date, the last update, and the details of the cart.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @Column(name = "user_id")
    private UUID id;

    @Column(name = "creation_date", nullable = false)
    private Timestamp creationDate;

    @Column(name = "last_update", nullable = false)
    private Timestamp lastUpdate;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CartDetail> cartDetails;

}

