package com.cnpm.bookingbackend.dtos.request;

import com.cnpm.bookingbackend.models.Room;
import com.cnpm.bookingbackend.models.RoomType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RoomTypeDto {
    private String title;
    private List<String> roomNumbers;
    private List<String> beds;
    private Float pricePerNight;
    private Integer capacity;
    private List<String> amenities;

    public RoomType toRoomType() {
        return new RoomType()
                .setTitle(title)
                .setBeds(beds)
                .setPricePerNight(pricePerNight)
                .setCapacity(capacity)
                .setAmenities(amenities);
    }
}
