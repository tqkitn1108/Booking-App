package com.cnpm.bookingbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDate;

@Document(collection = "reviews")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    private String id;
    private String bookingId;
    private String fullName;
    private Integer rating;
    private String content;
    private LocalDate reviewDate;

    public Review(String bookingId, String fullName, Integer rating, String content) {
        this.bookingId = bookingId;
        this.fullName = fullName;
        this.rating = rating;
        this.content = content;
    }
}
