package com.sunflowers.ecommerce.order.data;

import lombok.Data;

import java.util.List;

@Data
public class Payments {
    private List<Capture> captures;

}
