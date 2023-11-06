package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.services.HotelService;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/hotels")
public class HotelController {
    private HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping()
    public ResponseEntity<List<Hotel>> getAllHotels() {
        return new ResponseEntity<>(hotelService.allHotels(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getSingleHotel(@PathVariable ObjectId id) {
        return new ResponseEntity<>(hotelService.singleHotel(id), HttpStatus.OK);
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
    public ResponseEntity<Hotel> updateHotel(@RequestBody Hotel hotel, @PathVariable ObjectId id) {
        return new ResponseEntity<>(hotelService.updatedHotel(id, hotel), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHotel(@PathVariable ObjectId id) {
        hotelService.deletedHotel(id);
        return ResponseEntity.ok("Hotel has been deleted");
    }
}
