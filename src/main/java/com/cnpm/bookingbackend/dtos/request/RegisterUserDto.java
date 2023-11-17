package com.cnpm.bookingbackend.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class RegisterUserDto {
    @NotBlank
    @Size(min = 5, max = 30)
    private String fullName;
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private String role;
    @NotBlank
    @Size(min = 8, max = 40)
    private String password;
}
