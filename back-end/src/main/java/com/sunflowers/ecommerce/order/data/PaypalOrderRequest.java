package com.sunflowers.ecommerce.order.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
public class PaypalOrderRequest implements Serializable {
    private PaypalOrderIntent intent;
    @JsonProperty("purchase_units")
    private List<PurchaseUnit> purchaseUnits;
    @JsonProperty("application_context")
    private PayPalAppContext applicationContext;
}
