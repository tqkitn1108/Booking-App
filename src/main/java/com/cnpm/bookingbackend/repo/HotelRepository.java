package com.cnpm.bookingbackend.repo;

import com.cnpm.bookingbackend.models.Hotel;
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

    List<Hotel> findByType(String type);

    Page<Hotel> findByStar(Integer star, Pageable pageable);

    Page<Hotel> findByNameContaining(String name, Pageable pageable);
}
