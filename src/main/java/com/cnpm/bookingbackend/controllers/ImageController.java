package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.services.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/upload")
public class ImageController {

    private final ImageService imageService;

    @PostMapping
    public String upload(@RequestParam("file") MultipartFile multipartFile) {
        // return image url in format:
        // https://firebasestorage.googleapis.com/v0/b/booking-project-eea45.appspot.com/o/19509ad8-b33a-47f9-86f2-bfdcf5cc66f7.jpg?alt=media
        return imageService.upload(multipartFile);
    }
}
