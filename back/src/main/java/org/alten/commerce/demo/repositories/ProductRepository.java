package org.alten.commerce.demo.repositories;

import org.alten.commerce.demo.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
