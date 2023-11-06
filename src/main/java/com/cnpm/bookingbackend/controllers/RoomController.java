package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.models.Room;
import com.cnpm.bookingbackend.services.RoomService;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/hotels")
public class RoomController {
    private RoomService roomService;
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }
    @GetMapping("/{hotelId}")
    public ResponseEntity<List<Room>> getAllRooms(@PathVariable ObjectId hotelId) {
        return new ResponseEntity<>(roomService.allRooms(hotelId), HttpStatus.OK);
    }

    @GetMapping("/{hotelId}/available")
    public ResponseEntity<List<Room>> getAvailableRooms(@PathVariable ObjectId hotelId,
                                                        @RequestParam LocalDate checkIn,
                                                        @RequestParam LocalDate checkOut) {
        return new ResponseEntity<>(roomService.allRooms(hotelId), HttpStatus.OK);
    }
}
