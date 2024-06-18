package com.sunflowers.ecommerce.auth.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Country entity represents a country in the system.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "country")
public class Country {

    @Id
    @Column(name = "prefix", nullable = false, length = 4)
    private String prefix;

    @Column(name = "name", nullable = false, length = 60)
    private String name;

}
