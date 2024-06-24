package com.sunflowers.ecommerce.order.data;

import lombok.Data;

import java.util.List;

@Data
public class Capture {
    private String id;
    private String status;
    private Amount amount;
    private boolean final_capture;
    private SellerProtection seller_protection;
    private String create_time;
    private String update_time;
    private List<Link> links;

}
