package com.cnpm.bookingbackend.repo;

import com.cnpm.bookingbackend.models.RoomType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomTypeRepository extends MongoRepository<RoomType, String> {
}
