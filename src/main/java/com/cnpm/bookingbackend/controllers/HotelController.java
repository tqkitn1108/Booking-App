package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.dtos.request.HotelDto;
import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.services.HotelService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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
            @RequestParam(required = false) String dest,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size) {
        return new ResponseEntity<>(hotelService.allHotels(dest, page, size), HttpStatus.OK);
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
    public ResponseEntity<Hotel> createHotel(@Valid @RequestBody HotelDto hotelDto) {
        Hotel createdHotel = hotelService.newHotel(hotelDto);
//        URI location = ServletUriComponentsBuilder
//                .fromCurrentRequest()
//                .path("/{id}")
//                .buildAndExpand(hotel.getId())
//                .toUri();
//        return ResponseEntity.created(location).build();
        return new ResponseEntity<>(createdHotel, HttpStatus.CREATED);
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

    @GetMapping("/countByDest")
    public ResponseEntity<Map<String, Integer>> countByDest(@RequestParam List<String> destinations) {
        return new ResponseEntity<>(hotelService.countByDest(destinations), HttpStatus.OK);
    }
}
