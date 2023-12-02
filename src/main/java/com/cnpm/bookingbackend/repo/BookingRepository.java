package com.cnpm.bookingbackend.repo;

import com.cnpm.bookingbackend.models.Booking;
import com.cnpm.bookingbackend.models.BookingStatus;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByBookingStatus(BookingStatus bookingStatus);
}
