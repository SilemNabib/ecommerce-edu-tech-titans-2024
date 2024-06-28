package com.sunflowers.ecommerce.order.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sunflowers.ecommerce.order.data.Link;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class PaypalOrderResponse implements Serializable {
    private String id;
    private String status;
    @JsonProperty("links")
    private List<Link> links;
    private String orderId;
}

