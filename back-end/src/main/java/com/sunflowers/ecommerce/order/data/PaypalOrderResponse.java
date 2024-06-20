package com.sunflowers.ecommerce.order.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class PaypalOrderResponse implements Serializable {
    private String id;
    private String status;
    @JsonProperty("links")
    private List<Link> links;
}

@Data
class Link {
    private String href;
    private String rel;
    private String method;
}
