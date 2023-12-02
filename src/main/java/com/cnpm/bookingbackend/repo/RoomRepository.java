package com.cnpm.bookingbackend.repo;

import com.cnpm.bookingbackend.models.Room;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface RoomRepository extends MongoRepository<Room, String> {
}
