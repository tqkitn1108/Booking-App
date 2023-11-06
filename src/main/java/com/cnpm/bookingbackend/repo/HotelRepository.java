package com.cnpm.bookingbackend.repo;

import com.cnpm.bookingbackend.models.Hotel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends MongoRepository<Hotel, ObjectId> {
}
