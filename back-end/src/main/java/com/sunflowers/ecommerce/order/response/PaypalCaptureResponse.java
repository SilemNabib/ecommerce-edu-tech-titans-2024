package com.sunflowers.ecommerce.order.response;

import com.sunflowers.ecommerce.order.data.Link;
import com.sunflowers.ecommerce.order.data.PurchaseUnit;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaypalCaptureResponse {
    private String id;
    private String status;
    private List<PurchaseUnit> purchase_units;
    private List<Link> links;

}


