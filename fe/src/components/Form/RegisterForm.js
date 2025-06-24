import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
    });
    const navigate = useNavigate();

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            setMessage("Đăng ký thành công!");
        } catch (err) {
            setMessage("Đăng ký thất bại!");
        }
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card style={{ width: "100%", maxWidth: "500px" }} className="p-4 shadow-sm">
                <h3 className="text-center mb-4">Đăng ký tài khoản</h3>

                {message && <Alert variant="info">{message}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formFullName">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập họ và tên"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Nhập email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập số điện thoại"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Đăng ký
                    </Button>
                    {/* Nút chuyển sang đăng nhập */}
                    <Button
                        variant="outline-secondary"
                        className="w-100"
                        onClick={() => navigate("/login")}
                    >
                        Đã có tài khoản? Đăng nhập
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default RegisterForm;
