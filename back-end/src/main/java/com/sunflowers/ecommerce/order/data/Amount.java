package com.sunflowers.ecommerce.order.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class Amount {
    @JsonProperty("currency_code")
    private String currencyCode;
    @JsonProperty("value")
    private BigDecimal value;
}
