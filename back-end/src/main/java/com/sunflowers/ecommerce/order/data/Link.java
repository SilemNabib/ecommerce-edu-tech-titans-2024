package com.sunflowers.ecommerce.order.data;


import lombok.Data;

@Data
public class Link {
    private String href;
    private String rel;
    private String method;
}