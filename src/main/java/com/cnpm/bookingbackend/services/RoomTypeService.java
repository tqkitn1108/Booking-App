package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.models.RoomType;
import com.cnpm.bookingbackend.repo.HotelRepository;
import com.cnpm.bookingbackend.repo.RoomTypeRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RoomTypeService {
    private final RoomTypeRepository roomTypeRepository;
    private final HotelRepository hotelRepository;
    private final MongoTemplate mongoTemplate;

    public RoomTypeService(RoomTypeRepository roomTypeRepository, HotelRepository hotelRepository, MongoTemplate mongoTemplate) {
        this.roomTypeRepository = roomTypeRepository;
        this.hotelRepository = hotelRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public List<RoomType> allRoomTypes(String hotelId) {
        return hotelRepository.findById(hotelId).orElseThrow().getRoomTypes();
    }

    public RoomType singleRoomType(String id) {
        return roomTypeRepository.findById(id).orElse(null);
    }

    public List<RoomType> availableRoomTypes(String hotelId, LocalDate checkIn, LocalDate checkOut) {
        return allRoomTypes(hotelId).stream()
                .filter(roomType -> roomType.countAvailableRooms(checkIn, checkOut) > 0).toList();
    }

    public RoomType newRoomType(String hotelId, RoomType roomType) {
        mongoTemplate.update(Hotel.class)
                .matching(Criteria.where("id").is(hotelId))
                .apply(new Update().push("roomTypes", roomType))
                .first();
        return roomTypeRepository.save(roomType);
    }

    public RoomType updateRoomType(String id, RoomType roomType) {
        roomType.setId(id);
        return roomTypeRepository.save(roomType);
    }

    public void deleteRoomType(String hotelId, String roomTypeId) {
        mongoTemplate.update(Hotel.class)
                .matching(Criteria.where("id").is(hotelId))
                .apply(new Update().pull("roomTypes", roomTypeRepository.findById(roomTypeId).orElseThrow()))
                .first();
        roomTypeRepository.deleteById(roomTypeId);
    }
}
