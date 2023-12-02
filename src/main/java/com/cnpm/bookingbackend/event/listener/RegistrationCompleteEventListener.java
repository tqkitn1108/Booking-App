package com.cnpm.bookingbackend.event.listener;

import com.cnpm.bookingbackend.event.RegistrationCompleteEvent;
import com.cnpm.bookingbackend.models.User;
import com.cnpm.bookingbackend.services.EmailService;
import com.cnpm.bookingbackend.services.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Component
@RequiredArgsConstructor // Create the constructor with the final/nonNull fields
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {
    private final UserService userService;
    private final EmailService emailService;
    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        // 1. Get the newly registered user
        User user = event.getUser();
        // 2. Create a verification token for the user
        String verificationToken = UUID.randomUUID().toString();
        // 3. Save the verification token for the user
        userService.saveUserVerificationToken(user, verificationToken);
        // 4. Build the verification url to be sent to the user
        String url = event.getApplicationUrl() + "/api/v1/auth/verifyEmail?token=" + verificationToken;
        // 5. Send the email
        try {
            emailService.sendVerificationEmail(url, user);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
}
