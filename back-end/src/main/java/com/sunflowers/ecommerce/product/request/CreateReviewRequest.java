package com.sunflowers.ecommerce.product.request;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateReviewRequest {

    private Long productId;
    private String comment;
    private int rating;

}
