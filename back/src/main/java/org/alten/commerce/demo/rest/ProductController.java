package org.alten.commerce.demo.rest;

import org.alten.commerce.demo.entities.Product;
import org.alten.commerce.demo.repositories.ProductRepository;
import org.alten.commerce.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product, Authentication auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        product.setCreatedAt(Instant.now());
        product.setUpdatedAt(Instant.now());
        return ResponseEntity.ok(productRepository.save(product));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product updated, Authentication auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        return productRepository.findById(id)
                .map(existing -> {
                    updated.setId(id);
                    updated.setUpdatedAt(Instant.now());
                    return ResponseEntity.ok(productRepository.save(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id, Authentication auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        productRepository.deleteById(id);
        return ResponseEntity.ok(Boolean.TRUE);
    }

    private boolean isAdmin(Authentication auth) {
        return auth != null && auth.getName().equals("admin@admin.com");
    }
}
