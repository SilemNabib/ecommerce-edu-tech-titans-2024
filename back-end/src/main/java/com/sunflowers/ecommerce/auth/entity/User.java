package com.sunflowers.ecommerce.auth.entity;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity class representing a user in the system.
 */
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@JsonIgnoreProperties({"addresses", "cart", "orders", "reviews"})
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "first_name", nullable = false)
    @NotBlank(message = "User First Name is mandatory")
    private String firstName;

    @Column(name = "last_name", nullable = false)
    @NotBlank(message = "User Last Name is mandatory")
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    @Email(message = "User Email is not valid")
    private String email;

    @Column(name = "password", nullable = false)
    @NotBlank(message = "User Password is mandatory")
    @JsonIgnore
    private String password;

    @Column(name = "phone", nullable = false)
    @NotBlank(message = "User Phone is mandatory")
    private String phone;

    @Column(name = "registration_date", nullable = false)
    private Timestamp registrationDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @Column(name = "deleted")
    private Timestamp deleted;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Address> addresses;

    /**
     * Returns the authorities granted to the user.
     *
     * @return a collection of granted authorities
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    /**
     * Returns the password used to authenticate the user.
     *
     * @return the password
     */
    @Override
    public String getPassword() {
        return this.password;
    }

    /**
     * Returns the username used to authenticate the user.
     *
     * @return the username
     */
    @Override
    public String getUsername() {
        return this.email;
    }
}
