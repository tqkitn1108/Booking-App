package com.cnpm.bookingbackend.dtos.response;

import com.cnpm.bookingbackend.models.Role;
import com.cnpm.bookingbackend.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponse {
    private String userId;
    private String userEmail;
    private String userFullName;
    private Role userRole;
    private String userImage;

    public UserInfoResponse(User user) {
        this.userId = user.getId();
        this.userEmail = user.getEmail();
        this.userFullName = user.getFullName();
        this.userRole = user.getRole();
        this.userImage = user.getImageUrl();
    }
}
