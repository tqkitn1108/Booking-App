package com.cnpm.bookingbackend.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilterHotelDto {
    private List<Integer> star;
    private List<String> type;
    private List<String> rating;
    private List<String> facilities;
}
