package com.sunflowers.ecommerce.inventory.request;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateInventoryRequest {
    private Long productId;
    private String color;
    private String size;
    private Integer stock = 0;
    private Long id = null;
}
