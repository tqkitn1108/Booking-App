package com.cnpm.bookingbackend.repo;

import com.cnpm.bookingbackend.models.hotelattributemodels.Facility;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FacilityRepository extends MongoRepository<Facility, String> {
    Optional<Facility> findByName(String name);
    Optional<Facility> findByLabel(String label);
}
