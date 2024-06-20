package com.sunflowers.ecommerce.product.request;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BannerRequest {
    private String url;
}
