package com.sunflowers.ecommerce.order.entity;

import com.sunflowers.ecommerce.auth.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
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

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;

    @Column(name = "platform_id")
    private String platformId;

    @Column(name = "platform_status")
    private String platformStatus;

    @Column(name = "creation_date", nullable = false)
    private Timestamp creationDate;

    @Column(name = "shipping_price", nullable = false, precision = 10, scale = 2)
    @DecimalMin(value = "0.00", message = "Shipping Price must be greater than 0.00")
    private BigDecimal shippingPrice;

    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    @DecimalMin(value = "0.00", message = "Total Price must be greater than 0.00")
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status")
    private OrderStatus orderStatus;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;

}
