package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.models.Room;
import com.cnpm.bookingbackend.repo.HotelRepository;
import org.bson.types.ObjectId;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class HotelService {
    private final HotelRepository hotelRepository;
    private MongoTemplate mongoTemplate;

    public HotelService(HotelRepository hotelRepository, MongoTemplate mongoTemplate) {
        this.hotelRepository = hotelRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public Hotel singleHotel(String id) {
        return hotelRepository.findById(id).orElse(null);
    }

    public Page<Hotel> allHotels(String location, int page, int size) {
        Pageable paging = PageRequest.of(page, size, Sort.by("rating").descending());
        Page<Hotel> hotelsPage;
        if (location == null)
            hotelsPage = hotelRepository.findAll(paging);
        else
            hotelsPage = hotelRepository.findByLocation(location, paging);
        return hotelsPage;
    }

    public Page<Hotel> availableHotels(int page, int size, Map<String, String> filters) {
        String location = filters.get("location");
        LocalDate checkIn = LocalDate.parse(filters.get("checkin"));
        LocalDate checkOut = LocalDate.parse(filters.get("checkout"));
        int adults = Integer.parseInt(filters.get("adults"));
        int children = Integer.parseInt(filters.get("children"));
        int noRooms = Integer.parseInt(filters.get("no_rooms"));

        Page<Hotel> hotelPage = hotelRepository.findByLocation(location, PageRequest.of(page, size));
        List<Hotel> hotelList = hotelPage.getContent().stream().filter(hotel -> {
            int maxPeople = 0, numOfRooms = 0;
            for (Room room : hotel.getRooms()) {
                if (room.isAvailableBetween(checkIn, checkOut)) {
                    maxPeople += room.getCapacity();
                    numOfRooms++;
                }
            }
            return maxPeople >= adults || numOfRooms >= noRooms - 1;
        }).toList();
        hotelPage = new PageImpl<>(hotelList,
                PageRequest.of(page, size, Sort.by("rating").descending()), hotelList.size());
        return hotelPage;
    }

    public void newHotel(Hotel hotel) {
        hotelRepository.save(hotel);
    }

    public Hotel updatedHotel(String id, Hotel hotel) {
        Hotel existingHotel = hotelRepository.findById(id).orElse(hotel);
        Class<? extends Hotel> hotelClass = hotel.getClass();
        for (Field field : hotelClass.getDeclaredFields()) {
            try {
                field.setAccessible(true);
                Object value = field.get(hotel);
                if (value != null) {
                    field.set(existingHotel, value);
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return hotelRepository.save(existingHotel);
    }

    public void deletedHotel(String id) {
        hotelRepository.deleteById(id);
    }
}
