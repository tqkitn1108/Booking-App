package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.dtos.request.LoginUserDto;
import com.cnpm.bookingbackend.dtos.request.RegisterUserDto;
import com.cnpm.bookingbackend.models.ERole;
import com.cnpm.bookingbackend.models.Role;
import com.cnpm.bookingbackend.models.User;
import com.cnpm.bookingbackend.models.token.VerificationToken;
import com.cnpm.bookingbackend.repo.RoleRepository;
import com.cnpm.bookingbackend.repo.UserRepository;
import com.cnpm.bookingbackend.repo.VerificationTokenRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final VerificationTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, RoleRepository roleRepository,
                                 VerificationTokenRepository tokenRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public User signup(RegisterUserDto input) throws Exception {
        String email = input.getEmail().toLowerCase();
        if (userRepository.findByEmail(email).isPresent()) {
            throw new Exception("User with email " + input.getEmail() + " already exists");
        }
        Optional<Role> optionalRole = roleRepository.findByName(input.getRole() == null ? ERole.USER : input.getRole());
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

    public String verifyEmail(String token) {
        Optional<VerificationToken> theToken = tokenRepository.findByToken(token);
        if (theToken.isEmpty()) return "Invalid verification token";
        User user = theToken.get().getUser();
        if (user.isVerified()) return "This account has been verified, please login.";
        if (theToken.get().getExpirationTime().getTime() < System.currentTimeMillis()) {
            tokenRepository.delete(theToken.get());
            return "Token already expired";
        }
        user.setVerified(true);
        userRepository.save(user);
        return "Email verified successfully. Now you can login to your account.";
    }
}
