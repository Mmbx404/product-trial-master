package org.alten.commerce.demo;

import org.alten.commerce.demo.entities.Product;
import org.alten.commerce.demo.entities.User;
import org.alten.commerce.demo.entities.enums.InventoryStatus;
import org.alten.commerce.demo.repositories.ProductRepository;
import org.alten.commerce.demo.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.Instant;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    CommandLineRunner injectData(UserRepository userRepository, PasswordEncoder passwordEncoder, ProductRepository productRepository) {
        return args -> {
            User admin = new User();
            admin.setEmail("admin@admin.com");
            admin.setUsername("admin");
            admin.setFirstname("admin");
            admin.setPassword(passwordEncoder.encode("admin"));
            userRepository.save(admin);
            userRepository.save(new User());
            var resource = new ClassPathResource("products.csv");
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
                // Skip header line and process each line
                reader.lines().skip(1).forEach(line -> {
                    String[] fields = line.split(",");

                    Product p = new Product();
                    p.setCode(fields[0]);
                    p.setName(fields[1]);
                    p.setDescription(fields[2]);
                    p.setImage(fields[3]);
                    p.setCategory(fields[4]);
                    p.setPrice(Double.parseDouble(fields[5]));
                    p.setQuantity(Integer.parseInt(fields[6]));
                    p.setInternalReference(fields[7]);
                    p.setShellId(Long.parseLong(fields[8]));
                    p.setInventoryStatus(InventoryStatus.valueOf(fields[9]));
                    p.setRating(Integer.parseInt(fields[10]));
                    p.setCreatedAt(Instant.parse(fields[11]));
                    p.setUpdatedAt(Instant.parse(fields[12]));

                    productRepository.save(p);
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        };
    }

}
