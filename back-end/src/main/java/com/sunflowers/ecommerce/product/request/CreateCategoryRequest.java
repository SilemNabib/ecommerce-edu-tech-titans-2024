package com.sunflowers.ecommerce.product.request;

import lombok.*;

/**
 * Request class for creating a new Category.
 * This class represents a request to create a new category with a name and description.
 */
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
