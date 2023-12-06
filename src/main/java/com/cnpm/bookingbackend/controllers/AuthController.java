package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.dtos.response.LoginResponse;
import com.cnpm.bookingbackend.dtos.response.UserInfoResponse;
import com.cnpm.bookingbackend.event.RegistrationCompleteEvent;
import com.cnpm.bookingbackend.models.User;
import com.cnpm.bookingbackend.dtos.request.LoginUserDto;
import com.cnpm.bookingbackend.dtos.request.RegisterUserDto;
import com.cnpm.bookingbackend.security.jwt.JwtService;
import com.cnpm.bookingbackend.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;
    private final ApplicationEventPublisher publisher;

    public AuthController(AuthenticationService authenticationService, JwtService jwtService,
                          ApplicationEventPublisher publisher) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
        this.publisher = publisher;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterUserDto registerUserDto,
                                           final HttpServletRequest request) throws Exception {
        User registeredUser = authenticationService.signup(registerUserDto);
        publisher.publishEvent(new RegistrationCompleteEvent(registeredUser, applicationUrl(request)));
        return ResponseEntity.ok("Success! Please check your email to complete your registration");
    }

    @GetMapping("/verifyEmail")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        return ResponseEntity.ok(authenticationService.verifyEmail(token));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody @Valid LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        UserInfoResponse userInfoResponse = new UserInfoResponse(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime(), userInfoResponse);
        return ResponseEntity.ok(loginResponse);
    }

    private String applicationUrl(HttpServletRequest request) {
        String protocol = request.getServerName().equals("localhost") ? "http://" : "https://";
        return protocol + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }
}
