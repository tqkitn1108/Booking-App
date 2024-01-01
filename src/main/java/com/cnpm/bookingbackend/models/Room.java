package com.cnpm.bookingbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "rooms")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Room {
    @Id
    private String id;
    private String roomNumber;
    private List<LocalDate> unavailableDates;
    private List<String> bookingIds;
    public Room(String roomNumber) {
        this.roomNumber = roomNumber;
        this.unavailableDates = new ArrayList<>();
        this.bookingIds = new ArrayList<>();
    }
    public Boolean isAvailableBetween(LocalDate checkIn, LocalDate checkOut) {
        LocalDate date = checkIn;
        while (!date.isAfter(checkOut)) {
            if (unavailableDates.contains(date)) {
                return false;
            }
            date = date.plusDays(1);
        }
        return true;
    }

    public void deletePastDate() {
        LocalDate currentDate = LocalDate.now();
        unavailableDates.removeIf(date -> date.isBefore(currentDate));
    }
}
