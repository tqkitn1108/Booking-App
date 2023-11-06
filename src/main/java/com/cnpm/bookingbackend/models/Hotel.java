package com.cnpm.bookingbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "hotels")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Hotel {
    @Id
    private ObjectId id;
    private String name;
    private int star;
    private String type;
    private String city;
    private String address;
    private String distance;
    private String title;
    private List<String> photos;
    private String description;
    private Float rating;
    @DocumentReference
    private List<Room> rooms;
    @DocumentReference
    private List<Review> reviews;
    private Float cheapestPrice;
    private Boolean featured;
}
