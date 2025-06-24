import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";

const LoginForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            setMessage("Đăng nhập thành công!");
        } catch (err) {
            setMessage("Sai tài khoản hoặc mật khẩu!");
        }
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4 shadow-sm">
                <h3 className="text-center mb-4">Đăng nhập</h3>

                {message && <Alert variant="info">{message}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Nhập email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" className="w-100">
                        Đăng nhập
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default LoginForm;
