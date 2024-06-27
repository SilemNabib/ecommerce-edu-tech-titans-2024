package com.sunflowers.ecommerce.order.dto;

import java.math.BigDecimal;
import java.util.UUID;

public class OrderDetailDto {
    private UUID id;
    private UUID inventoryId;
    private String colorName;
    private int amount;
    private BigDecimal unitPrice;
}
