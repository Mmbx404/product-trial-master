package org.alten.commerce.demo.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Data
@Table(name = "user_table")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String firstname;
    private String email;
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<Long> wishlistProductIds = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private Map<Long, Integer> cartItems = new HashMap<>();
}
