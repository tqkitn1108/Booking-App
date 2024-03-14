package com.cnpm.bookingbackend.repo;

import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.models.hotelattributemodels.PropertyType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HotelRepository extends MongoRepository<Hotel, String> {
    Optional<Hotel> findByName(String name);

    List<Hotel> findByDest(String dest);

    Page<Hotel> findByDest(String dest, Pageable pageable);

    List<Hotel> findByType(PropertyType type);
    List<Hotel> findByEmail(String email);

    Page<Hotel> findByStar(Integer star, Pageable pageable);

    Page<Hotel> findByNameRegex(String regex, Pageable pageable);
    List<Hotel> findByNameRegex(String regex);
}
