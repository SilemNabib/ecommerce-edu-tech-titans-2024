package com.sunflowers.ecommerce.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "color")
public class Color {

    @Id
    @Column(name = "name", nullable = false, length = 32)
    private String name;

    @Column(name = "code", nullable = false, length = 6)
    private String code;

    @OneToMany(mappedBy = "color")
    private Set<Inventory> inventories;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<Inventory> getInventories() {
        return inventories;
    }

    public void setInventories(Set<Inventory> inventories) {
        this.inventories = inventories;
    }
}

