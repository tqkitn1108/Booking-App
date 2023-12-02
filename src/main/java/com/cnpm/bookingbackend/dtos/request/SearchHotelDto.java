package com.cnpm.bookingbackend.dtos.request;

import lombok.Data;

import java.time.LocalDate;
@Data
public class SearchHotelDto {
    private String dest;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer adults;
    private Integer children;
    private Integer noRooms;
}
