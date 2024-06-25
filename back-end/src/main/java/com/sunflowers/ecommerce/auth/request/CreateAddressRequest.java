package com.sunflowers.ecommerce.auth.request;

import com.sunflowers.ecommerce.auth.entity.Country;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CreateAddressRequest {
    private String street;
    private String city;
    private String zipCode;
    private String phone;
    private String countryCode;
    private String fullName;
    private String personId;
}
