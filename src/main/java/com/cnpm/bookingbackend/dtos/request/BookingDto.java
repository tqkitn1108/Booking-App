package com.cnpm.bookingbackend.dtos.request;

import com.cnpm.bookingbackend.models.Booking;
import com.cnpm.bookingbackend.models.PaymentDetails;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class BookingDto {
    @NotBlank
    private String fullName;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String phoneNumber;
    @NotNull
    @Size(min = 1)
    private List<String> roomIds;
    private Double totalPrice;
    private Integer adults;
    private Integer children;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
//    private PaymentDetails paymentDetails;

    public Booking toBooking(){
        return new Booking()
                .setFullName(fullName)
                .setEmail(email)
                .setPhoneNumber(phoneNumber)
                .setTotalPrice(totalPrice)
                .setAdults(adults)
                .setChildren(children)
                .setCheckInDate(checkInDate)
                .setCheckOutDate(checkOutDate);
//                .setPaymentDetails(paymentDetails);
    }
}
