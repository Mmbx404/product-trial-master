package org.alten.commerce.demo.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.alten.commerce.demo.entities.enums.InventoryStatus;

import java.time.Instant;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String name;
    private String description;
    private String image;
    private String category;
    private Double price;
    private Integer quantity;
    private String internalReference;
    private Long shellId;

    @Enumerated(EnumType.STRING)
    private InventoryStatus inventoryStatus;

    private Integer rating;
    private Instant createdAt;
    private Instant updatedAt;
}
