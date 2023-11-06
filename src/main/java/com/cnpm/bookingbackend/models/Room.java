package com.cnpm.bookingbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "rooms")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Room {
    @Id
    private ObjectId id;
    private String title;
    private String type;
    private float price;
    private int capacity;
    private List<String> amenities;
    private String description;
    private List<String> images;
    private boolean available;
    private List<LocalDate> unavailableDates;
}
