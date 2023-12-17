package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.models.Room;
import com.cnpm.bookingbackend.models.RoomType;
import com.cnpm.bookingbackend.repo.RoomRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final MongoTemplate mongoTemplate;

    public RoomService(RoomRepository roomRepository, MongoTemplate mongoTemplate) {
        this.roomRepository = roomRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public List<Room> allRooms(String hotelId) {
        List<Room> rooms = new ArrayList<>();
        Objects.requireNonNull(mongoTemplate.findById(hotelId, Hotel.class)).getRoomTypes()
                .forEach(roomType -> {
                    rooms.addAll(roomType.getRooms());
                });
        return rooms;
    }

    public Room singleRoom(String id) {
        return roomRepository.findById(id).orElse(null);
    }

    public List<Room> availableRooms(String hotelId, LocalDate checkIn, LocalDate checkOut) {
        return allRooms(hotelId).stream()
                .filter(room -> room.isAvailableBetween(checkIn, checkOut)).toList();
    }

    public Room newRoom(Room room) {
        roomRepository.save(room);
        mongoTemplate.update(RoomType.class)
                .matching(Criteria.where("id").is(room.getRoomTypeId()))
                .apply(new Update().push("rooms").value(room))
                .first();
        return room;
    }

    public String deleteRoom(String roomId) {
        Room deletedRoom = roomRepository.findById(roomId).orElseThrow();
        mongoTemplate.update(RoomType.class)
                .matching(Criteria.where("id").is(deletedRoom.getRoomTypeId()))
                .apply(new Update().pull("rooms", deletedRoom))
                .first();
        roomRepository.deleteById(roomId);
        return "Room has been deleted";
    }
}
