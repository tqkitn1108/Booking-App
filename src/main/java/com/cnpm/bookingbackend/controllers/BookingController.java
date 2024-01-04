package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.dtos.request.BookingDto;
import com.cnpm.bookingbackend.models.Booking;
import com.cnpm.bookingbackend.services.BookingService;
import com.cnpm.bookingbackend.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {
    private final BookingService bookingService;
    private final EmailService emailService;

    public BookingController(BookingService bookingService, EmailService emailService) {
        this.bookingService = bookingService;
        this.emailService = emailService;
    }

    @GetMapping("/users/{userId}")
//    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Booking>> getBookingsOfUser(@PathVariable String userId) {
        return ResponseEntity.ok(bookingService.allUserBookings(userId));
    }

    @GetMapping("/hotels/{hotelId}")
//    @PreAuthorize("hasRole('HOTEL')")
    public ResponseEntity<List<Booking>> getBookingsOfHotel(@PathVariable String hotelId) {
        return ResponseEntity.ok(bookingService.allHotelBookings(hotelId));
    }

    @GetMapping("/hotels/{hotelId}/pending")
//    @PreAuthorize("hasRole('HOTEL')")
    public ResponseEntity<List<Booking>> getPendingBookings(@PathVariable String hotelId) {
        return ResponseEntity.ok(bookingService.pendingBookings(hotelId));
    }

    @PostMapping("/hotels/{hotelId}")
    public ResponseEntity<Booking> createBooking(@PathVariable String hotelId, @Valid @RequestBody BookingDto bookingDto) {
        return ResponseEntity.ok(bookingService.createReservation(hotelId, bookingDto));
    }

    @PutMapping("/{bookingId}")
    public void confirmBooking(@RequestBody Booking booking) throws Exception {
        bookingService.confirmBooking(booking);
        emailService.sendConfirmBookingEmail(booking);
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<String> deleteBooking(@PathVariable String bookingId) {
        bookingService.deleteBooking(bookingId);
        return ResponseEntity.ok("The booking has been cancelled successfully");
    }
}
