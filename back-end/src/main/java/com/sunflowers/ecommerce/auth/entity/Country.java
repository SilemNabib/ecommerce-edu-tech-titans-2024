package com.sunflowers.ecommerce.auth.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "country")
public class Country {

    @Id
    @Column(name = "prefix", nullable = false, length = 4)
    private String prefix;

    @Column(name = "name", nullable = false, length = 60)
    private String name;

}
