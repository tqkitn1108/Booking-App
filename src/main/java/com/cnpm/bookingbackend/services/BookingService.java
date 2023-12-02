package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.dtos.request.BookingDto;
import com.cnpm.bookingbackend.models.*;
import com.cnpm.bookingbackend.repo.BookingRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final MongoTemplate mongoTemplate;

    public BookingService(BookingRepository bookingRepository, MongoTemplate mongoTemplate) {
        this.bookingRepository = bookingRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public List<Booking> allUserBookings(String userId) {
        return Objects.requireNonNull(mongoTemplate.findById(userId, User.class)).getBookings();
    }

    public List<Booking> allHotelBookings(String hotelId) {
        return Objects.requireNonNull(mongoTemplate.findById(hotelId, Hotel.class)).getBookings();
    }

    public Booking createReservation(String hotelId, BookingDto bookingDto) {
        Booking booking = bookingDto.toBooking();
        List<Room> roomList = bookingDto.getRoomIds().stream().map(roomId ->
                mongoTemplate.findById(roomId, Room.class)).toList();
        booking.setHotelId(hotelId);
        booking.setRooms(roomList);
        booking.setBookingStatus(BookingStatus.PENDING);

        List<LocalDate> stayDateList = new ArrayList<>();
        LocalDate date = bookingDto.getCheckInDate();
        while (!date.isAfter(bookingDto.getCheckOutDate())) {
            stayDateList.add(date);
            date = date.plusDays(1);
        }
        roomList.forEach(room -> {
            room.deletePastDate();
            room.getUnavailableDates().addAll(stayDateList);
        });

        bookingRepository.save(booking);
        mongoTemplate.update(User.class)
                .matching(Criteria.where("id").is(bookingDto.getBookingPersonId()))
                .apply(new Update().push("bookings", booking))
                .first();

        return booking;
    }

    public void confirmBooking(String bookingId, BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        booking.setBookingStatus(status);
        bookingRepository.save(booking);
    }

    public void deleteBooking(String bookingId) {
        bookingRepository.deleteById(bookingId);
    }

}
