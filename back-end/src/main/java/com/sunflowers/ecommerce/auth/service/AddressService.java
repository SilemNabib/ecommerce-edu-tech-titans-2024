package com.sunflowers.ecommerce.auth.service;

import com.sunflowers.ecommerce.auth.entity.Address;
import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.repository.AddressRepository;
import com.sunflowers.ecommerce.auth.repository.CountryRepository;
import com.sunflowers.ecommerce.auth.request.CreateAddressRequest;
import com.sunflowers.ecommerce.utils.EntityMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private AuthService authService;

    public MappingJacksonValue getUserAddress(String authorizationHeader) {
        User user = authService.validateAuthorization(authorizationHeader);
        return EntityMapping.getSimpleBeanPropertyFilter(user.getAddresses(), "AddressFilter", "id", "street", "zipCode", "country", "phone", "city", "fullName", "personId");
    }

    public MappingJacksonValue createAddress(String authorizationHeader, CreateAddressRequest address) {
        User user = authService.validateAuthorization(authorizationHeader);

        validateAddress(address);

        Address newAddress = Address.builder()
                .fullName(address.getFullName())
                .country(countryRepository.findById(address.getCountryCode()).orElseThrow(() -> new RuntimeException("Country not found")))
                .city(address.getCity())
                .zipCode(address.getZipCode())
                .street(address.getStreet())
                .phone(address.getPhone())
                .personId(address.getPersonId())
                .user(user)
                .build();

        return EntityMapping.getSimpleBeanPropertyFilter(addressRepository.save(newAddress), "AddressFilter", "id", "street", "zipCode", "country", "phone", "city", "fullName", "personId");
    }

    private void validateAddress(CreateAddressRequest address) {
        if(address.getFullName() == null || address.getFullName().isEmpty()) {
            throw new IllegalArgumentException("Full name is required");
        }

        if(address.getCountryCode() == null || address.getCountryCode().isEmpty() || !countryRepository.existsById(address.getCountryCode())) {
            throw new IllegalArgumentException("Valid country code is required");
        }

        if(address.getCity() == null || address.getCity().isEmpty()) {
            throw new IllegalArgumentException("City is required");
        }

        if(address.getZipCode() == null || address.getZipCode().isEmpty()) {
            throw new IllegalArgumentException("Zip code is required");
        }

        if(address.getStreet() == null || address.getStreet().isEmpty()) {
            throw new IllegalArgumentException("Street is required");
        }

        if(address.getPhone() == null || address.getPhone().length() != 10){
            throw new IllegalArgumentException("Phone is required");
        }

        if(address.getPersonId() == null || address.getPersonId().isEmpty()) {
            throw new IllegalArgumentException("Person ID is required");
        }
    }
}
