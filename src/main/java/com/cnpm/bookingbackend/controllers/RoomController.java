package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.models.Room;
import com.cnpm.bookingbackend.services.RoomService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/hotels")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/{hotelId}/rooms")
    public ResponseEntity<List<Room>> getAllRooms(@PathVariable String hotelId) {
        return new ResponseEntity<>(roomService.allRooms(hotelId), HttpStatus.OK);
    }

    @GetMapping("/{hotelId}/rooms/{id}")
    public ResponseEntity<Room> getSingleRoom(@PathVariable String id) {
        return new ResponseEntity<>(roomService.singleRoom(id), HttpStatus.OK);
    }

    @GetMapping("/{hotelId}/available")
    public ResponseEntity<List<Room>> getAvailableRooms(
            @PathVariable String hotelId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkin,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkout) {
        return ResponseEntity.ok(roomService.availableRooms(hotelId, checkin, checkout));
    }

    @PostMapping("/{hotelId}/rooms")
    public ResponseEntity<Room> addNewRoom(@PathVariable String hotelId, @RequestBody Room room) {
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(room.getId())
                .toUri();
        return ResponseEntity.created(location).body(roomService.newRoom(hotelId, room));
    }

    @PutMapping("/{hotelId}/rooms/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable String id, @RequestBody Room room) {
        return ResponseEntity.ok(roomService.updateRoom(id, room));
    }

    @DeleteMapping("/{hotelId}/rooms/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable String hotelId, @PathVariable String id) {
        roomService.deleteRoom(hotelId, id);
        return ResponseEntity.ok("Room has been deleted");
    }
}
