import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {User, Mail, Lock, Phone} from 'react-feather';
import {toast} from 'react-toastify';

function RegisterForm({onSubmit}) {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }

        setIsLoading(true);
        try {
            await onSubmit({fullName, phone, email, password});
            toast("Registration successful!")
            // setMessage('');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMessage('Registration failed!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-wrapper">
            <div className="signup-container">
                <div className="account-box-header position-relative text-center" style={{ backgroundColor: "#fff", height: "0" }}>
                    <button
                        onClick={() => window.history.back()}
                        className="btn-back position-absolute"
                        style={{ left: '0', top: '50%', transform: 'translateY(-50%)', color: '#2973b2' }}
                    >
                        ←
                    </button>
                </div>
                <div className="signup-header text-center">
                    <h2>SIGN UP</h2>
                    <p>
                        Or{' '}
                        <Link to="/login" className="link">
                            login to your account
                        </Link>
                    </p>
                </div>

                {message && <div className="form-message">{message}</div>}

                <form className="signup-form" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <div className="input-wrapper">
                            <User className="icon"/>
                            <input
                                id="fullName"
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <div className="input-wrapper">
                            <Phone className="icon"/>
                            <input
                                id="phone"
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <div className="input-wrapper">
                            <Mail className="icon"/>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <Lock className="icon"/>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="input-wrapper">
                            <Lock className="icon"/>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`submit-button ${isLoading ? 'loading' : ''}`}
                    >
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
