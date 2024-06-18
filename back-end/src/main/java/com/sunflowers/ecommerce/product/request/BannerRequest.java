package com.sunflowers.ecommerce.product.request;

import lombok.*;

/**
 * Request class for the Banner.
 * This class represents a request to create or update a banner with a URL.
 */
@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BannerRequest {
    private String url;
}
