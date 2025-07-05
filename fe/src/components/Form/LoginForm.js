import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'react-feather';
import '../../assets/style/global.scss';

function LoginForm({ onSubmit }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onSubmit(formData);
            setMessage('Logged in!');
        } catch (err) {
            setMessage('Invalid email or password!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <div className="account-box-header position-relative text-center" style={{ backgroundColor: "#fff", height: "0" }}>
                    <button
                        onClick={() => window.history.back()}
                        className="btn-back position-absolute"
                        style={{ left: '0', top: '50%', transform: 'translateY(-50%)', color: '#2973b2' }}
                    >
                        ←
                    </button>
                </div>
                <div className="login-header">
                    <h2>LOGIN</h2>
                    <p>
                        Or{' '}
                        <Link to="/register" className="link">
                            create a new account
                        </Link>
                    </p>
                    {message && (
                        <div
                            className={`form-message ${
                                message === 'Logged in!' ? 'success' : 'error'
                            }`}
                        >
                            {message}
                        </div>
                    )}
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <div className="input-wrapper">
                            <Mail className="icon" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <Lock className="icon" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`submit-button ${isLoading ? 'loading' : ''}`}
                    >
                        {isLoading ? 'Logging in...' : 'Log in'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
