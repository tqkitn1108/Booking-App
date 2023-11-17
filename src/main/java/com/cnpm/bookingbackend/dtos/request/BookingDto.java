package com.cnpm.bookingbackend.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.bson.types.ObjectId;

import java.time.LocalDate;
import java.util.List;

@Data
public class BookingDto {
    @NotBlank
    private String fullName;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String phoneNumber;
    private List<String> roomIds;
    private Double totalPrice;
    private Integer adults;
    private Integer children;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
}
