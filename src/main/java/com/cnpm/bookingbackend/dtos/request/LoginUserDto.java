package com.cnpm.bookingbackend.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginUserDto {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
