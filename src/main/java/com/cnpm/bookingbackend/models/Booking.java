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

@Document(collection = "bookings")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    @Id
    private String id;
    private String fullName;
    private String email;
    private String phoneNumber;
    @DBRef
    private Hotel hotel;
    @DBRef
    private List<Room> rooms;
    private Double totalPrice;
    private Integer adults;
    private Integer children;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private BookingStatus bookingStatus;

    public Booking(String fullName, String email, String phoneNumber, Hotel hotel,
                   List<Room> rooms, Double totalPrice, Integer adults, Integer children,
                   LocalDate checkInDate, LocalDate checkOutDate) {
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.hotel = hotel;
        this.rooms = rooms;
        this.totalPrice = totalPrice;
        this.adults = adults;
        this.children = children;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
    }
}
