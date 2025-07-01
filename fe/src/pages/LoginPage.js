import React from "react";
import LoginForm from "../components/Form/LoginForm";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = async (formData) => {
        try {
            const token = await login(formData);
            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);
            const role = decoded.role;

            // 👉 Điều hướng theo vai trò
            if (role === "admin") {
                navigate("/admin"); // ✅ Giao diện admin
            } else {
                navigate("/"); // ✅ Giao diện người dùng thường
            }
        } catch (error) {
            console.error("Đăng nhập thất bại", error);
            throw error;
        }
    };

    return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;
