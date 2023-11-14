package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.dtos.request.BookingDto;
import com.cnpm.bookingbackend.models.Booking;
import com.cnpm.bookingbackend.models.BookingStatus;
import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.models.Room;
import com.cnpm.bookingbackend.repo.BookingRepository;
import com.cnpm.bookingbackend.repo.HotelRepository;
import com.cnpm.bookingbackend.repo.RoomRepository;
import com.cnpm.bookingbackend.repo.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository,
                          HotelRepository hotelRepository, RoomRepository roomRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.hotelRepository = hotelRepository;
        this.roomRepository = roomRepository;
    }

    public List<Booking> allBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> allUserBookings(ObjectId userId) {
        return userRepository.findById(userId).orElseThrow().getBookings();
    }

    public List<Booking> allHotelBookings(ObjectId hotelId) {
        List<Room> roomsInHotel = hotelRepository.findById(hotelId).orElseThrow().getRooms();
        List<Booking> bookingList = new ArrayList<>();
        for (Room room : roomsInHotel) {
            bookingList.addAll(room.getBookings());
        }
        return bookingList;
    }

    public Booking reservation(ObjectId hotelId, BookingDto bookingDto) {
        Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
        List<Room> roomList = bookingDto.getRoomIds().stream().map(roomId ->
                roomRepository.findById(roomId).orElseThrow()).toList();
        Booking booking = new Booking(bookingDto.getFullName(), bookingDto.getEmail(), bookingDto.getPhoneNumber(),
                hotel, roomList, bookingDto.getTotalPrice(), bookingDto.getAdults(), bookingDto.getChildren(),
                bookingDto.getCheckInDate(), bookingDto.getCheckOutDate());
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

        return bookingRepository.save(booking);
    }

    public void deleteBooking(ObjectId bookingId) {
        bookingRepository.deleteById(bookingId);
    }

}
