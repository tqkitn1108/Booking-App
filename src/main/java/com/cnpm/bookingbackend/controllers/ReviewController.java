package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.models.Review;
import com.cnpm.bookingbackend.services.ReviewService;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/hotels")
public class ReviewController {
    private ReviewService reviewService;
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }


    @GetMapping("/{hotelId}/reviews")
    public ResponseEntity<List<Review>> getAllReviews(@PathVariable ObjectId hotelId){
        return new ResponseEntity<>(reviewService.allReviews(hotelId), HttpStatus.OK);
    }

    @PostMapping("/{hotelId}/reviews")
    public ResponseEntity<Review> createReview(@RequestBody Map<String, Object> payload, @PathVariable ObjectId hotelId){
        return new ResponseEntity<>(reviewService.newReview((String)payload.get("content"), (int)payload.get("rating"), hotelId), HttpStatus.CREATED);
    }

}
