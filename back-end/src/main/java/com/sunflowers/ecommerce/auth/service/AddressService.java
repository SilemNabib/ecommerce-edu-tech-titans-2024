package com.sunflowers.ecommerce.auth.service;

import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.repository.AddressRepository;
import com.sunflowers.ecommerce.utils.EntityMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private AuthService authService;

    public MappingJacksonValue getUserAddress(String authorizationHeader) {
        User user = authService.validateAuthorization(authorizationHeader);
        return EntityMapping.getSimpleBeanPropertyFilter(user.getAddresses(), "AddressFilter", "id", "street", "zipCode", "country", "phone", "city", "fullName", "personId");
    }
}
