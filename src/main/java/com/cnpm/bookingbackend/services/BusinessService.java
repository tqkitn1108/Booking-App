package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.dtos.request.HotelDto;
import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.repo.FacilityRepository;
import com.cnpm.bookingbackend.repo.HotelRepository;
import com.cnpm.bookingbackend.repo.PropertyTypeRepository;
import com.cnpm.bookingbackend.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusinessService {
    private final HotelRepository hotelRepository;
    private final UserRepository userRepository;
    private final PropertyTypeRepository typeRepository;
    private final FacilityRepository facilityRepository;

    public List<Hotel> allHotels(String businessId) {
        String email = userRepository.findById(businessId).orElseThrow().getEmail();
        return hotelRepository.findByEmail(email);
    }

    public Hotel singleHotel(String id) {
        return hotelRepository.findById(id).orElse(null);
    }


    public Hotel newHotel(HotelDto hotelDto) {
        Hotel hotel = hotelDto.toHotel();
        hotel.setType(typeRepository.findByName(hotelDto.getType()).orElse(null));
        hotel.setFacilities(hotelDto.getFacilities().stream().map(facility ->
                facilityRepository.findByName(facility).orElse(null)).toList());
        hotel.setRating(0F);
        return hotelRepository.save(hotel);
    }

    public Hotel updatedHotel(String id, Hotel hotel) {
        hotel.setId(id);
        return hotelRepository.save(hotel);
    }

    public void deletedHotel(String id) {
        hotelRepository.deleteById(id);
    }

}
