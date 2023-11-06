package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.dtos.request.RegisterUserDto;
import com.cnpm.bookingbackend.models.ERole;
import com.cnpm.bookingbackend.models.Role;
import com.cnpm.bookingbackend.models.User;
import com.cnpm.bookingbackend.repo.RoleRepository;
import com.cnpm.bookingbackend.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public User createClient(RegisterUserDto input) {
        Optional<Role> optionalRole = roleRepository.findByName(ERole.CLIENT);
        if (optionalRole.isEmpty()) return null;
        User client = new User(input.getFullName(), input.getEmail().toLowerCase(),
                passwordEncoder.encode(input.getPassword()));
        client.setRole(optionalRole.get());
        return userRepository.save(client);
    }

}
