package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.dtos.request.FilterHotelDto;
import com.cnpm.bookingbackend.dtos.request.HotelDto;
import com.cnpm.bookingbackend.dtos.request.SearchHotelDto;
import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.models.Room;
import com.cnpm.bookingbackend.models.RoomType;
import com.cnpm.bookingbackend.repo.HotelRepository;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.util.*;

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

    public Page<Hotel> allHotels(String dest, int page, int size) {
        Pageable paging = PageRequest.of(page, size, Sort.by("rating").descending());
        Page<Hotel> hotelsPage;
        if (dest == null)
            hotelsPage = hotelRepository.findAll(paging);
        else
            hotelsPage = hotelRepository.findByDest(dest, paging);
        return hotelsPage;
    }

    public Page<Hotel> searchHotels(int page, int size, SearchHotelDto searchHotelDto, FilterHotelDto filter) {
        String dest = searchHotelDto.getLocation();
        LocalDate checkIn = searchHotelDto.getCheckIn();
        LocalDate checkOut = searchHotelDto.getCheckOut();
        int adults = searchHotelDto.getAdults();
        int children = searchHotelDto.getChildren();
        int noRooms = searchHotelDto.getNoRooms();

        List<Hotel> hotelList = hotelRepository.findByDest(dest).stream().filter(hotel -> {
            int maxPeople = 0, numOfRooms = 0;
            for (RoomType roomType : hotel.getRoomTypes()) {
                int numAvailableRooms = roomType.countAvailableRooms(checkIn, checkOut);
                maxPeople += numAvailableRooms * roomType.getCapacity();
                numOfRooms += numAvailableRooms;
            }
            return maxPeople >= adults + children / 4 || numOfRooms >= noRooms - 1;
        }).toList();
        hotelList = filterHotels(hotelList, filter);
        return new PageImpl<>(hotelList,
                PageRequest.of(page, size, Sort.by("rating").descending()), hotelList.size());
    }

    public Hotel newHotel(HotelDto hotelDto) {
        Hotel hotel = hotelDto.toHotel();
        hotel.setRating(0F);
        return hotelRepository.save(hotel);
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

    public Map<String, Integer> countByDest(List<String> destinations) {
        Map<String, Integer> map = new HashMap<>();
        destinations.forEach(dest -> map.put(dest, hotelRepository.findByDest(dest).size()));
        return map;
    }

    public Map<String, Integer> countByType(List<String> types) {
        Map<String, Integer> map = new HashMap<>();
        types.forEach(type -> map.put(type, hotelRepository.findByType(type).size()));
        return map;
    }

    public List<Hotel> filterHotels(List<Hotel> hotels, FilterHotelDto filter) {
        List<Hotel> filteredHotel = hotels;
        if(filter.getStar()!= null){
            filteredHotel = filteredHotel.stream().filter(hotel -> filter.getStar()
                    .stream().anyMatch(star -> Objects.equals(star, hotel.getStar()))).toList();
        }
        if(filter.getType()!= null){
            filteredHotel = filteredHotel.stream().filter(hotel -> filter.getType()
                    .stream().anyMatch(type -> Objects.equals(type, hotel.getType()))).toList();
        }
        if(filter.getRating()!= null){
            List<Float> ratingInFloat = filter.getRating().stream().map(rating -> {
                if(rating.equals("wonderful")) return 9F;
                if(rating.equals("excellent")) return 8F;
                if(rating.equals("good")) return 7F;
                return 6F;
            }).toList();
            filteredHotel = filteredHotel.stream().filter(hotel -> ratingInFloat
                    .stream().anyMatch(rating -> hotel.getRating() >= rating)).toList();
        }
        if(filter.getFacilities()!= null){
            filteredHotel = filteredHotel.stream().filter(hotel -> filter.getFacilities()
                    .stream().anyMatch(facility -> hotel.getFacilities().contains(facility))).toList();
        }
        return filteredHotel;
    }
}
