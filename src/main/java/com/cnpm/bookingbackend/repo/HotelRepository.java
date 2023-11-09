package com.cnpm.bookingbackend.repo;

import com.cnpm.bookingbackend.models.Hotel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HotelRepository extends MongoRepository<Hotel, ObjectId> {
    Optional<Hotel> findByName(String name);
    List<Hotel> findAllByLocality(String locality);
}
