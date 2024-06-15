package com.sunflowers.ecommerce.order.entity;

import com.sunflowers.ecommerce.auth.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @Column(name = "creation_date", nullable = false)
    private Timestamp creationDate;

    @Column(name = "shipping_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal shippingPrice;

    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status_name", nullable = false)
    private OrderStatus orderStatusName;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private HashSet<OrderDetail> orderDetails;

}
