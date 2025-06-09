package org.alten.commerce.demo.rest.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String firstname;
    private String email;
    private String password;
}
