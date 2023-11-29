package com.cnpm.bookingbackend.dtos.request;

import com.cnpm.bookingbackend.models.Hotel;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class HotelDto {
    @NotBlank
    private String name;
    @NotBlank
    private String phoneNumber;
    @NotBlank
    @Email
    private String email;
    @NotNull
    private Integer star;
    @NotBlank
    private String type;
    @NotBlank
    private String dest;
    @NotBlank
    private String address;
    @NotNull
    @Size(min = 1)
    private List<String> photos;
    private List<String> facilities;
    private String description;

    public Hotel toHotel() {
        return new Hotel()
                .setName(name)
                .setPhoneNumber(phoneNumber)
                .setEmail(email)
                .setStar(star)
                .setType(type)
                .setDest(dest)
                .setAddress(address)
                .setPhotos(photos)
                .setFacilities(facilities)
                .setDescription(description);
    }
}
