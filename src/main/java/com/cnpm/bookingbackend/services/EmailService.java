package com.cnpm.bookingbackend.services;

import com.cnpm.bookingbackend.models.Booking;
import com.cnpm.bookingbackend.models.Hotel;
import com.cnpm.bookingbackend.models.Room;
import com.cnpm.bookingbackend.models.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.StringJoiner;

@Service
public class EmailService {
    private final JavaMailSender mailSender;
    private final MongoTemplate mongoTemplate;
    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender, MongoTemplate mongoTemplate) {
        this.mailSender = mailSender;
        this.mongoTemplate = mongoTemplate;
    }

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }

    public void sendVerificationEmail(String url, User user) throws MessagingException, UnsupportedEncodingException {
        String subject = "Email Verification";
        String senderName = "Booking App";
        String mailContent = "<p> Hi, " + user.getFullName() + ", </p>" +
                "<p> Thank you for registering with us, </p>" +
                "<p> Please, follow the link below to complete your registration. </p>" +
                "<a href=\"" + url + "\"> Verify your email to activate your account</a>" +
                "<p> Thank you <br> Booking App Dev Team </p>";
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom(fromEmail, senderName);
        messageHelper.setTo(user.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);

        mailSender.send(message);
    }

    public void sendConfirmBookingEmail(Booking booking) throws MessagingException, UnsupportedEncodingException {
        Hotel hotel = mongoTemplate.findById(booking.getHotelId(), Hotel.class);
        assert hotel != null;
        StringJoiner joiner = new StringJoiner(", ");
        booking.getRooms().forEach(room -> joiner.add(room.getRoomNumber()));
        String subject = "Xác nhận đặt phòng";
        String senderName = "TravelBK";
        String mailContent = "<p> Chào " + booking.getFullName() + ", </p>" +
                "<p> Chúc mừng! Yêu cầu đặt phòng của bạn đã được xác nhận thành công. Dưới đây là thông tin chi tiết về đặt phòng của bạn: </p>" +
                "<ul>" +
                "<li><strong>Tên khách hàng: </strong>" + booking.getFullName() + "</li>" +
                "<li><strong>Email: </strong> " + booking.getEmail() + "</li>" +
                "<li><strong>Số điện thoại liên lạc: </strong>" + booking.getPhoneNumber() + "</li>" +
                "<li><strong>Ngày nhận phòng: </strong>" + booking.getCheckInDate() + "</li>" +
                "<li><strong>Ngày trả phòng: </strong>" + booking.getCheckOutDate() + "</li>" +
                "<li><strong>Danh sách phòng: </strong> " + joiner + "</li>" +
                "<li><strong>Số lượng khách: </strong>" + booking.getAdults() + " người lớn và " + booking.getChildren() + " trẻ em" + "</li>" +
                "<li><strong>Tổng cộng tiền phòng: </strong>" + booking.getTotalPrice() + "VND </li>" +
                "</ul>" +
                "<p>Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu đặc biệt nào, " +
                "xin vui lòng liên hệ với chúng tôi qua địa chỉ email " +
                "<a href=\"mailto:" + hotel.getEmail() + "\">" + hotel.getEmail() + "</a> hoặc số điện thoại " +
                "<a href=\"tel:" + hotel.getPhoneNumber() + "\">" + hotel.getPhoneNumber() + "</a>. " +
                "Đội ngũ chúng tôi luôn sẵn sàng hỗ trợ bạn.</p>" +
                "<p>Chúng tôi rất mong chờ đón tiếp bạn tại khách sạn chúng tôi. Xin cảm ơn đã tin tưởng và đặt phòng với chúng tôi!</p>" +
                "<p> Trân trọng,<br>" + hotel.getName() + "<br>" +
                hotel.getAddress() + "<br>" + hotel.getPhoneNumber() + "</p>";
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom(fromEmail, senderName);
        messageHelper.setTo(booking.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);

        mailSender.send(message);
    }
}
