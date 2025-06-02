require('dotenv').config();
const express = require("express");
const cors = require("cors");
const PayOS = require("@payos/node");
const nodemailer = require("nodemailer");

const app = express();

// Cấu hình nodemailer để gửi email qua Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "21130549@st.hcmuaf.edu.vn",
        pass: "kevf ihqs iagy uttj"
    }
});

// Hàm định dạng tiền tệ
const formatCurrency = (num) => new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
}).format(num);

// Hàm tạo nội dung email xác nhận
const generateConfirmationEmail = ({ bookingData, roomData, paymentMethod, transactionId }) => {
    const fullName = `${bookingData?.firstName || ""} ${bookingData?.lastName || ""}`;
    const nights = Math.ceil(
        (new Date(roomData?.checkOutDate) - new Date(roomData?.checkInDate)) / (1000 * 60 * 60 * 24)
    );
    const pricePerNight = parseInt(roomData?.price?.replace(/[^0-9]/g, "")) || 0;
    const total = pricePerNight * nights;

    return `
    <h1>Xác nhận đặt phòng thành công</h1>
    <p>Xin chào <strong>${fullName}</strong>,</p>
    <p>Cảm ơn bạn đã đặt phòng tại <strong>${roomData?.hotelName || "khách sạn"}</strong>. Thông tin chi tiết:</p>

    <ul>
      <li><strong>Email:</strong> ${bookingData?.email || "N/A"}</li>
      <li><strong>Điện thoại:</strong> ${bookingData?.phone || "N/A"}</li>
      <li><strong>Check-in:</strong> ${roomData?.checkInDate || "N/A"}</li>
      <li><strong>Check-out:</strong> ${roomData?.checkOutDate || "N/A"}</li>
      <li><strong>Số đêm:</strong> ${nights || "N/A"}</li>
      <li><strong>Giá mỗi đêm:</strong> ${formatCurrency(pricePerNight)}</li>
      <li><strong>Tổng tiền:</strong> ${formatCurrency(total)}</li>
      <li><strong>Phương thức thanh toán:</strong> ${paymentMethod || "N/A"}</li>
      ${transactionId ? `<li><strong>Mã giao dịch:</strong> ${transactionId}</li>` : ""}
    </ul>

    <p>Chúng tôi sẽ gửi hóa đơn chi tiết trong vòng 24h. Cảm ơn bạn đã sử dụng dịch vụ của TravelApp!</p>
    `;
};

// Hàm gửi email xác nhận
const sendConfirmationEmail = async ({ bookingData, roomData, paymentMethod, transactionId }) => {
    // Kiểm tra email người nhận
    if (!bookingData?.email) {
        throw new Error("Email người nhận không được cung cấp");
    }

    const htmlContent = generateConfirmationEmail({ bookingData, roomData, paymentMethod, transactionId });

    await transporter.sendMail({
        from: '"TravelApp" <21130549@st.hcmuaf.edu.vn>',
        to: bookingData.email,
        subject: "Xác nhận đặt phòng - TravelApp",
        html: htmlContent,
    });
};

// Khởi tạo PayOS client
const payOS = new PayOS(
    "c6954100-0181-4e28-bc42-22fe3e5d5119",
    "f10a4fdd-bafc-466e-9081-17ee12e46733",
    "042e13162770071e5953a34779d4f4916c2d17f9f64e961e88b10224ea81697b"
);

// Cấu hình middleware
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3007"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoint tạo link thanh toán PayOS
app.post("/api/create-payment-link", async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { amount, description, orderCode, returnUrl, cancelUrl, items } = req.body;

        if (!amount || amount <= 0) {
            console.log("Validation failed: Invalid amount");
            return res.status(400).json({ error: "Số tiền không hợp lệ" });
        }
        if (!description || !orderCode || !returnUrl || !cancelUrl || !items) {
            console.log("Validation failed: Missing required fields");
            return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
        }

        const body = {
            orderCode: parseInt(orderCode),
            amount: parseInt(amount),
            description: description,
            items: items,
            returnUrl: returnUrl,
            cancelUrl: cancelUrl,
            currency: "VND",
        };

        console.log("Constructed body for PayOS:", body);
        const paymentLinkResponse = await payOS.createPaymentLink(body);
        console.log("PayOS response:", paymentLinkResponse);

        res.status(200).json({
            checkoutUrl: paymentLinkResponse.checkoutUrl,
            orderCode: body.orderCode,
        });
    } catch (error) {
        console.error("Error occurred:", error.message, error.stack);
        res.status(500).json({
            error: "Lỗi khi tạo link thanh toán",
            details: error.message,
        });
    }
});

// Endpoint gửi email xác nhận
app.post("/api/send-confirmation-email", async (req, res) => {
    try {
        console.log("Received email request body:", req.body);
        await sendConfirmationEmail(req.body);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Gửi mail thất bại:", error.message, error.stack);
        res.status(500).json({ message: "Lỗi khi gửi mail xác nhận", details: error.message });
    }
});

// Khởi động server
app.listen(3030, () => {
    console.log("Server is listening on port 3030");
});