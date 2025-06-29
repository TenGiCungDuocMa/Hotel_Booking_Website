import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Booking/global.scss';

const PaymentCancelPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Auto redirect to hotel detail page after 3 seconds
        const timer = setTimeout(() => {
            navigate('/booking/1');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="payment-cancel-page" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
            fontFamily: 'Inter, sans-serif'
        }}>
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                maxWidth: '500px',
                width: '90%'
            }}>
                <div style={{
                    fontSize: '4rem',
                    marginBottom: '1rem'
                }}>
                    ❌
                </div>
                <h1 style={{
                    color: '#dc2626',
                    marginBottom: '1rem',
                    fontSize: '1.875rem',
                    fontWeight: '600'
                }}>
                    Thanh toán đã bị hủy
                </h1>
                <p style={{
                    color: '#6b7280',
                    marginBottom: '2rem',
                    lineHeight: '1.6'
                }}>
                    Bạn đã hủy quá trình thanh toán. Đặt phòng của bạn vẫn được lưu và bạn có thể thanh toán lại bất cứ lúc nào.
                </p>
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={() => navigate('/booking/1')}
                        style={{
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                    >
                        Quay lại khách sạn
                    </button>
                    <button
                        onClick={() => window.history.back()}
                        style={{
                            backgroundColor: '#6b7280',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
                    >
                        Thử lại thanh toán
                    </button>
                </div>
                <p style={{
                    color: '#9ca3af',
                    fontSize: '0.875rem',
                    marginTop: '2rem'
                }}>
                    Tự động chuyển hướng sau 3 giây...
                </p>
            </div>
        </div>
    );
};

export default PaymentCancelPage; 