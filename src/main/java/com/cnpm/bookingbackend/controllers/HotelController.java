package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.services.HotelService;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/hotels")
public class HotelController {
    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping()
    public ResponseEntity<Page<Hotel>> getAllHotels(
            @RequestParam(required = false) String location,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size) {
        return new ResponseEntity<>(hotelService.allHotels(location, page, size), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getSingleHotel(@PathVariable String id) {
        return new ResponseEntity<>(hotelService.singleHotel(id), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Hotel>> getAvailableHotels(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size,
            @RequestParam Map<String, String> filters) {
        return ResponseEntity.ok(hotelService.availableHotels(page, size, filters));
    }

    @PostMapping()
    public ResponseEntity<Hotel> createHotel(@RequestBody Hotel hotel) {
        hotelService.newHotel(hotel);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(hotel.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hotel> updateHotel(@RequestBody Hotel hotel, @PathVariable String id) {
        return new ResponseEntity<>(hotelService.updatedHotel(id, hotel), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHotel(@PathVariable String id) {
        hotelService.deletedHotel(id);
        return ResponseEntity.ok("Hotel has been deleted");
    }
}
