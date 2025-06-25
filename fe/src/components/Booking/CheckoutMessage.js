import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./global.scss"; // Sử dụng cùng style với BookingPage

const CheckoutMessage = () => {
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const success = searchParams.get("success");
        const canceled = searchParams.get("canceled");
        if (success) {
            setMessage("Thanh toán thành công. Đang chuyển đến trang xác nhận...");
            setTimeout(() => {
                // Optionally: fetch booking info here or use localStorage/sessionStorage
                navigate("/booking/confirm");
            }, 2000);
        } else if (canceled) {
            setMessage("Thanh toán thất bại. Đang chuyển về trang chọn phòng...");
            setTimeout(() => {
                navigate("/booking"); // or the route for hotel detail/room selection
            }, 2000);
        } else {
            setMessage("Không tìm thấy trạng thái thanh toán. Đang chuyển về trang chính...");
            setTimeout(() => navigate("/"), 2000);
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