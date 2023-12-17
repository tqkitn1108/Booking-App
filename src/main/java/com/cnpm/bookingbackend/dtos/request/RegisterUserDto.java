package com.cnpm.bookingbackend.dtos.request;

import com.cnpm.bookingbackend.models.ERole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterUserDto {
    @NotBlank
    @Size(min = 5, max = 30)
    private String fullName;
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private ERole role;
    @NotBlank
    @Size(min = 8, max = 40)
    private String password;
}
