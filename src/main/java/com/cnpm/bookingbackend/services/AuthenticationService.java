package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.dtos.request.LoginUserDto;
import com.cnpm.bookingbackend.dtos.request.RegisterUserDto;
import com.cnpm.bookingbackend.models.ERole;
import com.cnpm.bookingbackend.models.Role;
import com.cnpm.bookingbackend.models.User;
import com.cnpm.bookingbackend.repo.RoleRepository;
import com.cnpm.bookingbackend.repo.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, RoleRepository roleRepository,
                                 PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public User signup(RegisterUserDto input) throws Exception {
        String email = input.getEmail().toLowerCase();
        if (userRepository.findByEmail(email).isPresent()) {
            throw new Exception("Email has been used!");
        }
        Optional<Role> optionalRole = roleRepository.findByName(ERole.USER);
        if (optionalRole.isEmpty()) return null;

        User user = new User(input.getFullName(), email, passwordEncoder.encode(input.getPassword()));
        user.setRole(optionalRole.get());
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        String email = input.getEmail().toLowerCase();
        String password = input.getPassword();
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        return userRepository.findByEmail(email).orElseThrow();
    }
}
