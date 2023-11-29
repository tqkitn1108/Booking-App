package com.cnpm.bookingbackend.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewDto {
    private String bookingId;
    @NotBlank
    private String fullName;
    @NotNull
    private Integer rating;
    @NotBlank
    private String content;
}
