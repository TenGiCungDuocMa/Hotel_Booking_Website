import React from "react";
import RegisterForm from "../components/Form/RegisterForm";
import { register } from "../services/authService"; // services gọi API

const RegisterPage = () => {
    const handleRegister = async (data) => {
        return register(data); // gọi API đăng ký
    };

    return <RegisterForm onSubmit={handleRegister} />;
};

export default RegisterPage;
