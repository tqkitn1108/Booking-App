package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.models.Room;
import com.cnpm.bookingbackend.repo.HotelRepository;
import com.cnpm.bookingbackend.repo.RoomRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.util.List;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;
    private final MongoTemplate mongoTemplate;

    public RoomService(RoomRepository roomRepository, HotelRepository hotelRepository, MongoTemplate mongoTemplate) {
        this.roomRepository = roomRepository;
        this.hotelRepository = hotelRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public List<Room> allRooms(String hotelId) {
        return hotelRepository.findById(hotelId).orElseThrow().getRooms();
    }

    public Room singleRoom(String id) {
        return roomRepository.findById(id).orElse(null);
    }

    public List<Room> availableRooms(String hotelId, LocalDate checkIn, LocalDate checkOut) {
        return allRooms(hotelId).stream()
                .filter(room -> room.isAvailableBetween(checkIn, checkOut)).toList();
    }

    public Room newRoom(String hotelId, Room room) {
        mongoTemplate.update(Hotel.class)
                .matching(Criteria.where("id").is(hotelId))
                .apply(new Update().push("rooms", room))
                .first();
        return roomRepository.save(room);
    }

    public Room updateRoom(String roomId, Room room) {
        Room currentRoom = roomRepository.findById(roomId).orElseThrow();
        Class<? extends Room> roomClass = room.getClass();
        for (Field field : roomClass.getDeclaredFields()) {
            try {
                field.setAccessible(true);
                Object value = field.get(room);
                if (value != null) {
                    field.set(currentRoom, value);
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return roomRepository.save(currentRoom);
    }

    public void deleteRoom(String hotelId, String roomId) {
        mongoTemplate.update(Hotel.class)
                .matching(Criteria.where("id").is(hotelId))
                .apply(new Update().pull("rooms", roomRepository.findById(roomId).orElseThrow()))
                .first();
        roomRepository.deleteById(roomId);
    }
}
