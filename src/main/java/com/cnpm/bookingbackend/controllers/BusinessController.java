package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.dtos.request.HotelDto;
import com.cnpm.bookingbackend.dtos.request.RegisterUserDto;
import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.models.User;
import com.cnpm.bookingbackend.services.BusinessService;
import com.cnpm.bookingbackend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/business")
public class BusinessController {
    private final BusinessService businessService;
    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }
    @GetMapping("/{businessId}/hotels")
    public ResponseEntity<List<Hotel>> getAllHotels(@PathVariable String businessId) {
        return ResponseEntity.ok(businessService.allHotels(businessId));
    }

    @GetMapping("/hotels/{id}")
    public ResponseEntity<Hotel> getSingleHotel(@PathVariable String id) {
        return new ResponseEntity<>(businessService.singleHotel(id), HttpStatus.OK);
    }

    @PostMapping("/hotels")
    public ResponseEntity<Hotel> createHotel(@Valid @RequestBody HotelDto hotelDto) {
        Hotel createdHotel = businessService.newHotel(hotelDto);
//        URI location = ServletUriComponentsBuilder
//                .fromCurrentRequest()
//                .path("/{id}")
//                .buildAndExpand(hotel.getId())
//                .toUri();
//        return ResponseEntity.created(location).build();
        return new ResponseEntity<>(createdHotel, HttpStatus.CREATED);
    }

    @PutMapping("/hotels/{id}")
    public ResponseEntity<Hotel> updateHotel(@RequestBody Hotel hotel, @PathVariable String id) {
        return new ResponseEntity<>(businessService.updatedHotel(id, hotel), HttpStatus.OK);
    }
}
