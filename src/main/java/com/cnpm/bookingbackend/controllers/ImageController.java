package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.services.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile multipartFile) {
        return ResponseEntity.ok(imageService.upload(multipartFile));
    }
}
