package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.dtos.request.BookingDto;
import com.cnpm.bookingbackend.models.Booking;
import com.cnpm.bookingbackend.services.BookingService;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.allBookings());
    }

    @GetMapping()
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Booking>> getAllUserBookings(ObjectId userId) {
        return ResponseEntity.ok(bookingService.allUserBookings(userId));
    }

    @GetMapping("/{hotelId}")
    @PreAuthorize("hasRole('HOTEL')")
    public ResponseEntity<List<Booking>> getAllHotelBookings(@PathVariable ObjectId hotelId) {
        return ResponseEntity.ok(bookingService.allHotelBookings(hotelId));
    }

    @PostMapping("/{hotelId}")
    public ResponseEntity<Booking> createBooking(@PathVariable ObjectId hotelId, @RequestBody BookingDto bookingDto) {
        return ResponseEntity.ok(bookingService.reservation(hotelId, bookingDto));
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<String> deleteBooking(@PathVariable ObjectId bookingId) {
        bookingService.deleteBooking(bookingId);
        return ResponseEntity.ok("The booking has been cancelled successfully");
    }
}
