package com.sunflowers.ecommerce.order.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PayPalAppContext {
    @JsonProperty("brand_name")
    private String brandName;
    @JsonProperty("landing_page")
    private String landingPage;
    @JsonProperty("return_url")
    private String returnUrl;
    @JsonProperty("cancel_url")
    private String cancelUrl;
}
