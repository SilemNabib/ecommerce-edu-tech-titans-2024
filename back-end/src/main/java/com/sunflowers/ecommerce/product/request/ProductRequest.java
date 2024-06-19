package com.sunflowers.ecommerce.product.request;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private int page = 0;
    private int pageSize = 10;
    private String sortBy = "name";
    private String direction = "asc";
    private List<String> categories;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private List<String> sizes;
    private List<String> colors;
}