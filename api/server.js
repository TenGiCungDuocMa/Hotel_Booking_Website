require('dotenv').config();
const express = require("express");
const cors = require("cors");
const PayOS = require("@payos/node");

const app = express();

const payOS = new PayOS(
    process.env.PAYOS_CLIENT_ID,
    process.env.PAYOS_API_KEY,
    process.env.PAYOS_CHECKSUM_KEY
);

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3007"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
            currency: "VND", // Thêm trường currency
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

app.listen(3030, () => {
    console.log("Server is listening on port 3030");
});