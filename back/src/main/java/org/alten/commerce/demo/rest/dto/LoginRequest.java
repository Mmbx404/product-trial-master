package org.alten.commerce.demo.rest.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}