package com.cnpm.bookingbackend.validate;

import com.cnpm.bookingbackend.models.Room;

import java.time.LocalDate;

public class CheckAvailableRoom {
    public static boolean checkAvailable(Room room, LocalDate checkIn, LocalDate checkOut) {
        LocalDate date = checkIn;
        while (!date.isAfter(checkOut)) {
            if (room.getUnavailableDates().contains(date)) {
                return false;
            }
            date = date.plusDays(1);
        }
        return true;
    }
}
