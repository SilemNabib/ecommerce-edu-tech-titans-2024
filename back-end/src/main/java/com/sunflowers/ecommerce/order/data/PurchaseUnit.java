package com.sunflowers.ecommerce.order.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@Builder
public class PurchaseUnit implements Serializable {
    @JsonProperty("reference_id")
    private String referenceId;
    private Amount amount;
}
