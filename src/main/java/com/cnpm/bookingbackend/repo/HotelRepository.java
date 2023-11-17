package com.cnpm.bookingbackend.repo;

import com.cnpm.bookingbackend.models.Hotel;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HotelRepository extends MongoRepository<Hotel, String> {
    Optional<Hotel> findByName(String name);
    Page<Hotel> findByLocation(String location, Pageable pageable);
    Page<Hotel> findByStar(Integer star, Pageable pageable);
    Page<Hotel> findByCheapestPriceBetween(int from, int to, Pageable pageable);
    Page<Hotel> findByNameContaining(String name, Pageable pageable);
}
