package com.sunflowers.ecommerce.inventory.response;

import com.sunflowers.ecommerce.inventory.entity.Color;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UniqueColorsAndSizesResponse {

    Iterable<Color> colors;
    Iterable<String> sizes;
}
