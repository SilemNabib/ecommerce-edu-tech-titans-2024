package com.sunflowers.ecommerce.service;

import com.sunflowers.ecommerce.entity.User.User;
import com.sunflowers.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}
