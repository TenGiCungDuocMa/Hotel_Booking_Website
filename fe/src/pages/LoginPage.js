import React from "react";
import LoginForm from "../components/Form/LoginForm";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = async (formData) => {
        try {
            const token = await login(formData);       // 🔑 Gọi API và lấy token
            localStorage.setItem("token", token);       // 💾 Lưu token
            navigate("/");                              // ✅ Chuyển sang BookingPage
        } catch (error) {
            console.error("Đăng nhập thất bại", error);
            throw error; // Bắn lại để form hiển thị thông báo lỗi
        }
    };

    return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;
