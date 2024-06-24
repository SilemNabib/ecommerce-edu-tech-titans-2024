package com.sunflowers.ecommerce.auth.entity;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "address")
@JsonFilter("AddressFilter")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "street", nullable = false, length = 30)
    private String street;

    @Column(name = "city", nullable = false, length = 20)
    private String city;

    @Column(name = "zip_code", nullable = false, length = 20)
    private String zipCode;

    @Column(name = "phone", nullable = false, length = 10)
    private String phone;

    @ManyToOne
    @JoinColumn(name = "country_prefix", nullable = false)
    private Country country;

    @Column(name = "full_name", nullable = false, length = 50)
    private String fullName;

    @Column(name = "person_id", nullable = false, length = 20)
    private String personId;

    public String getStringAddress (){
        return street + ", " + zipCode + ", " + country.getName() + ". contact: " + country.getPrefix() + " " + phone + ".";
    }
}