package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.dtos.request.RegisterUserDto;
import com.cnpm.bookingbackend.models.ERole;
import com.cnpm.bookingbackend.models.Role;
import com.cnpm.bookingbackend.models.User;
import com.cnpm.bookingbackend.models.token.VerificationToken;
import com.cnpm.bookingbackend.repo.RoleRepository;
import com.cnpm.bookingbackend.repo.UserRepository;
import com.cnpm.bookingbackend.repo.VerificationTokenRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationTokenRepository tokenRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder, VerificationTokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public User createClient(RegisterUserDto input) {
        Optional<Role> optionalRole = roleRepository.findByName(ERole.HOTEL);
        if (optionalRole.isEmpty()) return null;
        User client = new User(input.getFullName(), input.getEmail().toLowerCase(),
                passwordEncoder.encode(input.getPassword()));
        client.setRole(optionalRole.get());
        return userRepository.save(client);
    }

    public void saveUserVerificationToken(User user, String token) {
        var verificationToken = new VerificationToken(token, user);
        tokenRepository.save(verificationToken);
    }
}
