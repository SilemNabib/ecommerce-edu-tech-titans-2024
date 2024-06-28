package com.sunflowers.ecommerce.order.data;

import lombok.Data;

import java.util.List;

@Data
public class SellerProtection {
    private String status;
    private List<String> dispute_categories;

}
