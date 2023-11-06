package com.cnpm.bookingbackend.bootstrap;

import com.cnpm.bookingbackend.dtos.request.RegisterUserDto;
import com.cnpm.bookingbackend.models.ERole;
import com.cnpm.bookingbackend.models.Role;
import com.cnpm.bookingbackend.models.User;
import com.cnpm.bookingbackend.repo.RoleRepository;
import com.cnpm.bookingbackend.repo.UserRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

//@Component
public class AdminSeeder implements ApplicationListener<ContextRefreshedEvent> {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    public AdminSeeder(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        this.createSuperAdministrator();
    }

    private void createSuperAdministrator() {
        RegisterUserDto userDto = new RegisterUserDto();
        userDto.setFullName("Admin");
        userDto.setEmail("hust.admin@email.com");
        userDto.setPassword("12345678");

        Optional<Role> optionalRole = roleRepository.findByName(ERole.ADMIN);
        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());

        if (optionalRole.isEmpty() || optionalUser.isPresent()) {
            return;
        }

        User user = new User(userDto.getFullName(), userDto.getEmail(), passwordEncoder.encode(userDto.getPassword()));
        user.setRole(optionalRole.get());

        userRepository.save(user);
    }
}

