package com.sunflowers.ecommerce.order.entity;

import com.sunflowers.ecommerce.inventory.entity.Inventory;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_detail", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"order_id", "inventory_id"})
})
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "inventory_id", nullable = false)
    private Inventory inventory;

    @Column(name = "amount", nullable = false)
    private int amount;

    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Unit Price is required")
    @DecimalMin(value = "0.00", message = "Unit Price must be greater than or equal to 0.00")
    private BigDecimal unitPrice;
}
