import React from "react";
import LoginForm from "../components/Form/LoginForm";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import {toast} from 'react-toastify';
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
                // toast("Logging in...")
                setTimeout(() => navigate('/admin'), 1000);
            } else {
                // toast("Logging in...")
                setTimeout(() => navigate('/'), 1000);
            }
        } catch (error) {
            // toast("Invalid email or password!");
            throw error;
        }
    };

    return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;
