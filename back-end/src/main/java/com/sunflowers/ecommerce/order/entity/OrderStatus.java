package com.sunflowers.ecommerce.order.entity;

/**
 * Enum representing order statuses in the system.
 * COMPLETED: the order has been completed successfully
 * PENDING: the order has been created but not yet processed
 * FAILED: the order has failed due to an error or issue
 * CANCELLED: the order has been cancelled by the user or the system
 * REFUNDED: the order has been refunded to the user
 * SHIPPED: the order has been shipped to the user
 */
public enum OrderStatus {
    COMPLETED, PENDING, FAILED, CANCELLED, REFUNDED, SHIPPED
}
