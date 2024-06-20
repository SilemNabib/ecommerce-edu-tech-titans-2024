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
    private String colorName;
    private String size;
    private Integer stock = 0;
}
