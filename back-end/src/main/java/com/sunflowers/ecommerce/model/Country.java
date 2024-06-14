package com.sunflowers.ecommerce.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "country")
public class Country {

    @Id
    @Column(name = "prefix", nullable = false, length = 4)
    private String prefix;

    @Column(name = "name", nullable = false, length = 60)
    private String name;

    @OneToMany(mappedBy = "country")
    private Set<Address> addresses;


}
