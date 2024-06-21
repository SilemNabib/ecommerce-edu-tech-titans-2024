package com.sunflowers.ecommerce.order.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Amount {
    @JsonProperty("currency_code")
    private String currencyCode;
    @JsonProperty("value")
    private BigDecimal value;
}
