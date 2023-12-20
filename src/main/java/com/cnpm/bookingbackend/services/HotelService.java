package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.dtos.request.FilterHotelDto;
import com.cnpm.bookingbackend.dtos.request.HotelDto;
import com.cnpm.bookingbackend.dtos.request.SearchHotelDto;
import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.models.RoomType;
import com.cnpm.bookingbackend.repo.FacilityRepository;
import com.cnpm.bookingbackend.repo.HotelRepository;
import com.cnpm.bookingbackend.repo.PropertyTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class HotelService {
    private final HotelRepository hotelRepository;
    private final PropertyTypeRepository typeRepository;
    private final FacilityRepository facilityRepository;
    private MongoTemplate mongoTemplate;

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
        List<Hotel> hotelList;
        if (searchHotelDto.getLocation() != null) {
            String dest = searchHotelDto.getLocation();
            hotelList = hotelRepository.findByDest(dest);
            if (searchHotelDto.getCheckIn() != null && searchHotelDto.getCheckOut() != null) {
                LocalDate checkIn = searchHotelDto.getCheckIn();
                LocalDate checkOut = searchHotelDto.getCheckOut();
                int adults = searchHotelDto.getAdults() != null ? searchHotelDto.getAdults() : 0;
                int children = searchHotelDto.getChildren() != null ? searchHotelDto.getChildren() : 0;
                int noRooms = searchHotelDto.getNoRooms() != null ? searchHotelDto.getNoRooms() : 1;

                hotelList = hotelList.stream().filter(hotel -> {
                    int maxPeople = 0, numOfRooms = 0;
                    for (RoomType roomType : hotel.getRoomTypes()) {
                        int numAvailableRooms = roomType.countAvailableRooms(checkIn, checkOut);
                        maxPeople += numAvailableRooms * roomType.getCapacity();
                        numOfRooms += numAvailableRooms;
                    }
                    return maxPeople >= adults + children / 4 || numOfRooms >= noRooms - 1;
                }).toList();
            }
        } else hotelList = hotelRepository.findAll();
        hotelList = filterHotels(hotelList, filter);

        Pageable pageable = PageRequest.of(page, size, Sort.by("rating").descending());
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), hotelList.size());
        List<Hotel> hotels = hotelList.subList(start, end);
        return new PageImpl<>(hotels, pageable, hotelList.size());
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
        types.forEach(type -> map.put(type, hotelRepository.findByType(typeRepository.findByName(type).orElse(null)).size()));
        return map;
    }

    public List<Hotel> filterHotels(List<Hotel> hotels, FilterHotelDto filter) {
        List<Hotel> filteredHotel = hotels;
        if (filter.getStar() != null) {
            filteredHotel = filteredHotel.stream().filter(hotel -> filter.getStar()
                    .stream().anyMatch(star -> Objects.equals(star, hotel.getStar()))).toList();
        }
        if (filter.getType() != null) {
            filteredHotel = filteredHotel.stream().filter(hotel -> filter.getType()
                    .stream().anyMatch(type -> Objects.equals(type, hotel.getType().getName()))).toList();
        }
        if (filter.getRating() != null) {
            List<Float> ratingInFloat = filter.getRating().stream().map(rating -> {
                if (rating.equals("wonderful")) return 9F;
                if (rating.equals("excellent")) return 8F;
                if (rating.equals("good")) return 7F;
                return 6F;
            }).toList();
            filteredHotel = filteredHotel.stream().filter(hotel -> ratingInFloat
                    .stream().anyMatch(rating -> hotel.getRating() >= rating)).toList();
        }
        if (filter.getFacilities() != null) {
            filteredHotel = filteredHotel.stream().filter(hotel -> filter.getFacilities()
                    .stream().anyMatch(facility ->
                            hotel.getFacilities().contains(facilityRepository.findByName(facility).orElse(null)))).toList();
        }
        return filteredHotel;
    }
}
