package com.sunflowers.ecommerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
