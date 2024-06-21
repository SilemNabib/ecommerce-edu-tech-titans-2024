package com.sunflowers.ecommerce.auth.controller;

import com.sunflowers.ecommerce.auth.entity.Country;
import com.sunflowers.ecommerce.auth.repository.CountryRepository;
import com.sunflowers.ecommerce.auth.response.ErrorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/country")
public class CountryController {

    @Autowired
    private CountryRepository countryRepository;

    @GetMapping("/")
    public ResponseEntity<Iterable<Country>> getCountry() {
        return ResponseEntity.ok(countryRepository.findAll());
    }

    @GetMapping("/{countryCode}")
    public ResponseEntity<Country> getCountryByCode(@PathVariable(name = "countryCode") String countryCode) {
        return ResponseEntity.ok(countryRepository.findById(countryCode)
                .orElseThrow(() -> new NoSuchElementException("Country not found")));
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorResponse> handleNoSuchElementException(NoSuchElementException e) {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Unexpected error",e.getMessage()));
    }
}
