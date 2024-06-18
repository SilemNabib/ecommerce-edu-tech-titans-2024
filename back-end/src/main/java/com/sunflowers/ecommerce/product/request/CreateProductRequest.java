package com.sunflowers.ecommerce.product.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

/**
 * Request class for creating a new Product.
 * This class represents a request to create a new product with a name, description, price, categories, and imageIds.
 */
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductRequest {

    @NotEmpty(message = "Name is required")
    private String name;

    @NotEmpty(message = "Description is required")
    private String description;

    @NotNull(message = "Price is required")
    private Double price;

    @NotEmpty(message = "Categories are required and must have exactly 3 categories")
    private List<String> categories;

    @NotEmpty(message = "Images are required and must have at least one image")
    private List<String> imageIds;

}
