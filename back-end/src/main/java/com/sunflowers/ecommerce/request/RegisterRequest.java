package com.sunflowers.ecommerce.request;

import com.sunflowers.ecommerce.entity.User.Role;
import com.sunflowers.ecommerce.entity.User.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Date registrationDate;
    private String phone;
    private Role role;
}

/*

example request:
{
    "email": "andres@ajaja.com",
    "password": "123456",
    "firstName": "Andres",
    "lastName": "Gomez",
    "phone": "1234567890"
}

* */
