package com.hotel.booking.controller;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.ItemData;
import vn.payos.type.PaymentData;

import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3007"})
public class PaymentController {

    private final JavaMailSender javaMailSender;
    private final PayOS payOS;

    public PaymentController(JavaMailSender javaMailSender, PayOS payOS) {
        this.javaMailSender = javaMailSender;
        this.payOS = payOS;
    }

    @PostMapping("/create-payment-link")
    public ResponseEntity<?> createPaymentLink(@RequestBody Map<String, Object> requestBody) {
        try {
            if (requestBody.get("amount") == null || requestBody.get("description") == null ||
                    requestBody.get("items") == null || requestBody.get("returnUrl") == null ||
                    requestBody.get("cancelUrl") == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Thiếu thông tin bắt buộc"));
            }

            long amount = Long.parseLong(requestBody.get("amount").toString());
            String description = requestBody.get("description").toString();
            String returnUrl = requestBody.get("returnUrl").toString();
            String cancelUrl = requestBody.get("cancelUrl").toString();
            long orderCode = System.currentTimeMillis() / 1000;

            Map<String, Object> itemMap = ((List<Map<String, Object>>) requestBody.get("items")).get(0);
            ItemData item = ItemData.builder()
                    .name(itemMap.get("name").toString())
                    .quantity(Integer.parseInt(itemMap.get("quantity").toString()))
                    .price((int) Long.parseLong(itemMap.get("price").toString()))
                    .build();

            PaymentData paymentData = PaymentData.builder()
                    .orderCode(orderCode)
                    .amount((int) amount)
                    .description(description)
                    .returnUrl(returnUrl)
                    .cancelUrl(cancelUrl)
                    .item(item)
                    .build();

            CheckoutResponseData result = payOS.createPaymentLink(paymentData);

            return ResponseEntity.ok(Map.of(
                    "checkoutUrl", result.getCheckoutUrl(),
                    "orderCode", orderCode
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Lỗi khi tạo link thanh toán", "details", e.getMessage()));
        }
    }

    @PostMapping("/send-confirmation-email")
    public ResponseEntity<?> sendConfirmationEmail(@RequestBody Map<String, Object> requestBody) {
        try {
            if (requestBody == null || requestBody.get("bookingData") == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Booking data is missing"));
            }

            @SuppressWarnings("unchecked")
            Map<String, Object> bookingData = (Map<String, Object>) requestBody.get("bookingData");
            @SuppressWarnings("unchecked")
            Map<String, Object> roomData = (Map<String, Object>) requestBody.get("roomData");
            String paymentMethod = (String) requestBody.get("paymentMethod");
            String transactionId = (String) requestBody.get("transactionId");

            if (bookingData.get("email") == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email người nhận không được cung cấp"));
            }

            String htmlContent = generateEmailContent(bookingData, roomData, paymentMethod, transactionId);
            sendEmail((String) bookingData.get("email"), "Xác nhận đặt phòng - TravelApp", htmlContent);

            return ResponseEntity.ok(Map.of("message", "Email sent successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Lỗi khi gửi email: " + e.getMessage()));
        }
    }

    private String generateEmailContent(Map<String, Object> bookingData, Map<String, Object> roomData, String paymentMethod, String transactionId) {
        String fullName = (bookingData.get("firstName") != null ? bookingData.get("firstName").toString() : "") + " " + (bookingData.get("lastName") != null ? bookingData.get("lastName").toString() : "");
        String hotelName = roomData.get("hotelName") != null ? roomData.get("hotelName").toString() : "khách sạn";
        String checkInDate = roomData.get("checkInDate") != null ? roomData.get("checkInDate").toString() : "N/A";
        String checkOutDate = roomData.get("checkOutDate") != null ? roomData.get("checkOutDate").toString() : "N/A";

        long nights = 0;
        if (checkInDate != null && checkOutDate != null) {
            nights = ChronoUnit.DAYS.between(LocalDate.parse(checkInDate), LocalDate.parse(checkOutDate));
        }

        String pricePerNightStr = roomData.get("price") != null ? roomData.get("price").toString() : "0";
        int pricePerNight = pricePerNightStr.replaceAll("[^0-9]", "").isEmpty() ? 0 : Integer.parseInt(pricePerNightStr.replaceAll("[^0-9]", ""));
        int total = (int) (pricePerNight * nights);

        NumberFormat vietnameseFormat = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));
        vietnameseFormat.setCurrency(Currency.getInstance("VND"));

        return String.format("""
            <h1>Xác nhận đặt phòng thành công</h1>
            <p>Xin chào <strong>%s</strong>,</p>
            <p>Cảm ơn bạn đã đặt phòng tại <strong>%s</strong>. Thông tin chi tiết:</p>
            <ul>
                <li><strong>Email:</strong> %s</li>
                <li><strong>Điện thoại:</strong> %s</li>
                <li><strong>Check-in:</strong> %s</li>
                <li><strong>Check-out:</strong> %s</li>
                <li><strong>Số đêm:</strong> %d</li>
                <li><strong>Giá mỗi đêm:</strong> %s</li>
                <li><strong>Tổng tiền:</strong> %s</li>
                <li><strong>Phương thức thanh toán:</strong> %s</li>
                %s
            </ul>
            <p>Chúng tôi sẽ gửi hóa đơn chi tiết trong vòng 24h. Cảm ơn bạn đã sử dụng dịch vụ của TravelApp!</p>
            """,
                fullName,
                hotelName,
                bookingData.get("email") != null ? bookingData.get("email").toString() : "N/A",
                bookingData.get("phone") != null ? bookingData.get("phone").toString() : "N/A",
                checkInDate,
                checkOutDate,
                nights,
                vietnameseFormat.format(pricePerNight),
                vietnameseFormat.format(total),
                paymentMethod != null ? paymentMethod : "N/A",
                transactionId != null ? "<li><strong>Mã giao dịch:</strong> " + transactionId + "</li>" : ""
        );
    }

    private void sendEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        helper.setFrom("21130549@st.hcmuaf.edu.vn");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        javaMailSender.send(mimeMessage);
    }
}
