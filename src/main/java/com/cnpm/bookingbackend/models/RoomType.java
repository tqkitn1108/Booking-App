package com.cnpm.bookingbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "room_types")
@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class RoomType {
    @Id
    private String id;
    private String title;
    @DocumentReference(lazy = true)
    private List<Room> rooms;
    private List<String> beds;
    private Float pricePerNight;
    private Integer capacity;
    private List<String> amenities;
//    private String description;
//    private List<String> images;

    public Integer countAvailableRooms(LocalDate checkIn, LocalDate checkOut) {
        return rooms.stream().filter(room -> room.isAvailableBetween(checkIn, checkOut)).toList().size();
    }
}
