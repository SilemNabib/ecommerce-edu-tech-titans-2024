package com.sunflowers.ecommerce.product.request;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateCategoryRequest {
    private String name;
    private String description;
}
