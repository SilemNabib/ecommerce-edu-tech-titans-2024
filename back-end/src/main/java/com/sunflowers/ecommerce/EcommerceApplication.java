package com.sunflowers.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.nio.file.Paths;

@SpringBootApplication
public class EcommerceApplication {

	public static void main(String[] args) {
		System.setProperty("GOOGLE_APPLICATION_CREDENTIALS", Paths.get("credentials.json").toAbsolutePath().toString());
		SpringApplication.run(EcommerceApplication.class, args);
	}

}
