package com.cnpm.bookingbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "rooms")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Room {
    @Id
    private String id;
    private String title;
    private String type;
    private Float pricePerNight;
    private Integer capacity;
    private List<String> amenities;
    private String description;
    private List<String> images;
    private List<LocalDate> unavailableDates;
    @DBRef
    private List<Booking> bookings;
    public Boolean isAvailableBetween(LocalDate checkIn, LocalDate checkOut) {
        LocalDate date = checkIn;
        while (!date.isAfter(checkOut)) {
                if (this.getUnavailableDates().contains(date)) {
                    return false;
                }
                date = date.plusDays(1);
        }
        return true;
    }

    public void deletePastDate(){
        LocalDate currentDate = LocalDate.now();
        unavailableDates.removeIf(date -> date.isBefore(currentDate));
    }
}
