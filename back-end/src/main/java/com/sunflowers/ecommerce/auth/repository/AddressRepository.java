package com.sunflowers.ecommerce.auth.repository;

import com.sunflowers.ecommerce.auth.entity.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AddressRepository extends CrudRepository<Address, UUID> {

}
