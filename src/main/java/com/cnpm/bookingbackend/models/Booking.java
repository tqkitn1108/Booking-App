package com.cnpm.bookingbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.*;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "bookings")
@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    @Id
    private String id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String hotelId;
    @DocumentReference(lazy = true)
    private List<Room> rooms;
    private Double totalPrice;
    private Integer adults;
    private Integer children;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
//    private PaymentDetails paymentDetails;
    @Field(targetType = FieldType.STRING)
    private BookingStatus bookingStatus;
}
