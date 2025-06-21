import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./global.scss"; // Sử dụng cùng style với BookingPage

const CheckoutMessage = () => {
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.get("success")) {
            setMessage("Thanh toán thành công. Cảm ơn bạn đã sử dụng PayOS!");
        } else if (searchParams.get("canceled")) {
            setMessage(
                "Thanh toán thất bại. Nếu có bất kỳ câu hỏi nào, hãy gửi email tới support@payos.vn."
            );
        } else {
            setMessage("Không tìm thấy trạng thái thanh toán.");
            // Redirect về trang chính sau 3 giây nếu không có trạng thái
            setTimeout(() => navigate("/"), 3000);
        }
    }, [searchParams, navigate]);

    return (
        <div className="main-box">
            <div className="checkout">
                <div className="product">
                    <p>{message}</p>
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="payment-button"
                >
                    Quay lại trang đặt phòng
                </button>
            </div>
        </div>
    );
};

export default CheckoutMessage;