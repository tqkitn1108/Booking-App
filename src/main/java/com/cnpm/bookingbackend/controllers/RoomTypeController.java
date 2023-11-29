package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.models.RoomType;
import com.cnpm.bookingbackend.services.RoomTypeService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/hotels")
public class RoomTypeController {
    private final RoomTypeService roomTypeService;

    public RoomTypeController(RoomTypeService roomTypeService) {
        this.roomTypeService = roomTypeService;
    }

    @GetMapping("/{hotelId}/roomTypes")
    public ResponseEntity<List<RoomType>> getAllRoomTypes(@PathVariable String hotelId) {
        return new ResponseEntity<>(roomTypeService.allRoomTypes(hotelId), HttpStatus.OK);
    }

    @GetMapping("/roomTypes/{id}")
    public ResponseEntity<RoomType> getRoomType(@PathVariable String id) {
        return new ResponseEntity<>(roomTypeService.singleRoomType(id), HttpStatus.OK);
    }

    @GetMapping("/{hotelId}/available")
    public ResponseEntity<List<RoomType>> getAvailableRoomTypes(
            @PathVariable String hotelId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkin,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkout) {
        return ResponseEntity.ok(roomTypeService.availableRoomTypes(hotelId, checkin, checkout));
    }

    @PostMapping("/{hotelId}/roomTypes")
    public ResponseEntity<RoomType> addNewRoomType(@PathVariable String hotelId, @RequestBody RoomType roomType) {
        return new ResponseEntity<>(roomTypeService.newRoomType(hotelId, roomType), HttpStatus.CREATED);
    }

    @PutMapping("/roomTypes/{id}")
    public ResponseEntity<RoomType> updateRoomType(@PathVariable String id, @RequestBody RoomType roomType) {
        return ResponseEntity.ok(roomTypeService.updateRoomType(id, roomType));
    }

    @DeleteMapping("/{hotelId}/rooms/{id}")
    public ResponseEntity<String> deleteRoomType(@PathVariable String hotelId, @PathVariable String id) {
        roomTypeService.deleteRoomType(hotelId, id);
        return ResponseEntity.ok("This RoomType has been deleted");
    }
}
