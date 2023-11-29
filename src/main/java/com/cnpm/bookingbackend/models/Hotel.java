package com.cnpm.bookingbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "hotels")
@Data
@Accessors(chain = true)
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
    private String dest;
    private String address;
    private List<String> photos;
    private List<String> facilities;
    private String description;
    private Float rating;
    @DocumentReference
    private List<RoomType> roomTypes;
    @DocumentReference
    private List<Review> reviews;
    @DocumentReference(lazy = true)
    private List<Booking> bookings;
    private Integer minPrice;
    private Integer maxPrice;

    public void updatePrice(Integer pricePerNight) {
        minPrice = pricePerNight < minPrice ? pricePerNight : minPrice;
        maxPrice = pricePerNight > maxPrice ? pricePerNight : maxPrice;
    }

    public void updateRating(Integer reviewRating) {
        int numberOfReviews = reviews.size();
        rating = (rating * numberOfReviews + reviewRating) / (numberOfReviews + 1);
    }
}
