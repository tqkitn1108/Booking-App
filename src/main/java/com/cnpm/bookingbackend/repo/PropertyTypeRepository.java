package com.cnpm.bookingbackend.repo;

import com.cnpm.bookingbackend.models.hotelattributemodels.PropertyType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PropertyTypeRepository extends MongoRepository<PropertyType, String> {
    Optional<PropertyType> findByName(String name);
    Optional<PropertyType> findByLabel(String label);
}
