package com.cnpm.bookingbackend.models.token;

import com.cnpm.bookingbackend.models.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Date;

@Document(collection = "tokens")
@Data
@NoArgsConstructor
public class VerificationToken {
    @Id
    private String id;
    private String token;
    private Date expirationTime;
    private static final int EXPIRE_TIME = 900000;

    @DocumentReference
    private User user;

    public VerificationToken(String token) {
        this.token = token;
        this.expirationTime = new Date(System.currentTimeMillis() + EXPIRE_TIME);
    }

    public VerificationToken(String token, User user) {
        this.token = token;
        this.user = user;
        this.expirationTime = new Date(System.currentTimeMillis() + EXPIRE_TIME);
    }
}
