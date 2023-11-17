package com.cnpm.bookingbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
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
//    @MongoId(FieldType.OBJECT_ID)
    private String id;
    private String name;
    private String phoneNumber;
    private String email;
    private Integer star;
    private String type;
    private String location;
    private String address;
    private List<String> photos;
    private List<String> facilities;
    private String description;
    private Float rating;
    @DocumentReference
    private List<Room> rooms;
    @DocumentReference
    private List<Review> reviews;
    private Integer cheapestPrice;
    private Boolean featured;
}
