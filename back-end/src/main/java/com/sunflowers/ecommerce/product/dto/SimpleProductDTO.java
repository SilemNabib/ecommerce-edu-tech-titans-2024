package com.sunflowers.ecommerce.product.dto;

import com.sunflowers.ecommerce.product.entity.Product;
import com.sunflowers.ecommerce.product.entity.ProductImage;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Data
public class SimpleProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal discount;
    private BigDecimal price;
    private List<ProductImage> productImages;
    private Double rating;

    public SimpleProductDTO(Product product) {
        this.id = product.getId().longValue(); // Convertir Integer a Long
        this.name = product.getName();
        this.description = product.getDescription();
        this.discount = product.getDiscount();
        this.price = product.getPrice();
        this.productImages = product.getProductImages();
        this.rating = product.getRating();
    }
}