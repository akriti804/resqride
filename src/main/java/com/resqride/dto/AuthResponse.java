package com.resqride.dto;

import com.resqride.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class AuthResponse {

    private Long id;
    private String token;
    private String fullName;
    private String email;
    private Role role;
}