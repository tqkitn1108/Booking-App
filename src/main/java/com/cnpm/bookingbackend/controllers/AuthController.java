package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.dtos.response.LoginResponse;
import com.cnpm.bookingbackend.models.User;
import com.cnpm.bookingbackend.dtos.request.LoginUserDto;
import com.cnpm.bookingbackend.dtos.request.RegisterUserDto;
import com.cnpm.bookingbackend.security.jwt.JwtService;
import com.cnpm.bookingbackend.services.AuthenticationService;
import com.cnpm.bookingbackend.services.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;
    private final EmailService emailService;

    public AuthController(AuthenticationService authenticationService, JwtService jwtService, EmailService emailService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody @Valid RegisterUserDto registerUserDto) throws Exception {
        User registeredUser = authenticationService.signup(registerUserDto);
        String subject = "Confirm your account";
        String body = "Your account has been created on our platform";
        emailService.sendEmail(registerUserDto.getEmail(), subject, body);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody @Valid LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }
}
