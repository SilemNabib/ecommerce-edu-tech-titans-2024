package com.sunflowers.ecommerce.inventory.request;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateColorRequest {
    private String name;
    private String code;
}
