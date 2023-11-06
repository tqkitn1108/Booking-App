package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.models.Review;
import com.cnpm.bookingbackend.repo.HotelRepository;
import com.cnpm.bookingbackend.repo.ReviewRepository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
public class ReviewService {
    private ReviewRepository reviewRepository;
    private HotelRepository hotelRepository;
    private MongoTemplate mongoTemplate;

    public ReviewService(ReviewRepository reviewRepository,
                         MongoTemplate mongoTemplate,
                         HotelRepository hotelRepository) {
        this.reviewRepository = reviewRepository;
        this.mongoTemplate = mongoTemplate;
        this.hotelRepository = hotelRepository;
    }

    public List<Review> allReviews(ObjectId hotelId) {
        return Objects.requireNonNull(hotelRepository.findById(hotelId).orElse(null)).getReviews();
    }

    public Review newReview(String content, int rating, ObjectId hotelId) {
        Review review = new Review(content, rating);
        review.setReviewDate(LocalDate.now());
        reviewRepository.insert(review);
        mongoTemplate.update(Hotel.class)
                .matching(Criteria.where("id").is(hotelId))
                .apply(new Update().push("reviews").value(review))
                .first();
        return review;
    }
}
