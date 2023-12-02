package com.cnpm.bookingbackend.repo;

import com.cnpm.bookingbackend.models.ERole;
import com.cnpm.bookingbackend.models.Role;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
