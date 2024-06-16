package com.sunflowers.ecommerce.auth.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "city_id", nullable = false)
    private int cityId;

    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "zip_code", nullable = false, length = 20)
    private String zipCode;

    @Column(name = "phone", nullable = false, length = 20)
    private String phone;

    @ManyToOne
    @JoinColumn(name = "country_prefix", nullable = false)
    private Country country;
}
