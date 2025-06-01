import React, { useState } from 'react';
import logoZalo from './img/PNG/Logo FA-13.png';
import logoMomo from './img/momo-primary-logo/MoMo Primary Logo/png/momo_icon_square_pinkbg_RGB.png';
import qrZalo from './img/Screenshot_20240118_092516.jpg';
import qrMomo from './img/239039221.jpg';
import axios from "axios";
import './global.scss'; // Tạo file SCSS riêng

const PaymentForm = ({ bookingData, roomData, onPaymentConfirm }) => {
    const [selectedMethod, setSelectedMethod] = useState('hotel'); // Mặc định chọn thanh toán tại khách sạn
    const [selectedSubOption, setSelectedSubOption] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const paymentMethods = [
        {
            id: 'vietqr',
            label: 'VietQR',
            discount: true,
            subContent: (
                <div className="qr-content">
                    <img src="https://img.vietqr.io/image/MB-30110300003770-compact.png"
                         alt="QR VietQR"
                         className="qr-image" />
                    <div className="qr-instructions">
                        <p><span>1.</span> Mở ứng dụng ngân hàng hoặc ví điện tử hỗ trợ VietQR</p>
                        <p><span>2.</span> Quét mã QR bên trên</p>
                        <p><span>3.</span> Kiểm tra thông tin và xác nhận thanh toán</p>
                        <div className="timer">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#FF4757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Mã QR có hiệu lực trong 15 phút
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'ewallet',
            label: 'Ví điện tử',
            subOptions: [
                {
                    id: 'zalopay',
                    label: 'ZaloPay',
                    logo: logoZalo,
                    subContent: (
                        <div className="qr-content">
                            <img src={qrZalo} alt="QR ZaloPay" className="qr-image" />
                            <div className="qr-instructions">
                                <p><span>1.</span> Mở ứng dụng ZaloPay</p>
                                <p><span>2.</span> Chọn tính năng "Quét mã"</p>
                                <p><span>3.</span> Quét mã QR bên trên để thanh toán</p>
                                <div className="timer">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#FF4757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Mã QR có hiệu lực trong 15 phút
                                </div>
                            </div>
                        </div>
                    ),
                },
                {
                    id: 'momo',
                    label: 'MoMo',
                    logo: logoMomo,
                    subContent: (
                        <div className="qr-content">
                            <img src={qrMomo} alt="QR MoMo" className="qr-image" />
                            <div className="qr-instructions">
                                <p><span>1.</span> Mở ứng dụng MoMo</p>
                                <p><span>2.</span> Chọn tính năng "Quét mã"</p>
                                <p><span>3.</span> Quét mã QR bên trên để thanh toán</p>
                                <div className="timer">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#FF4757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Mã QR có hiệu lực trong 15 phút
                                </div>
                            </div>
                        </div>
                    ),
                },
            ],
        },
        {
            id: 'payos',
            label: 'Thanh toán PayOS',
            subContent: (
                <div className="payos-content">
                    <p>Bạn sẽ được chuyển hướng đến trang thanh toán an toàn của PayOS để hoàn tất giao dịch.</p>
                    <ul className="benefits">
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 13L9 17L19 7" stroke="#27AE60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Thanh toán bằng thẻ ngân hàng nội địa
                        </li>
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 13L9 17L19 7" stroke="#27AE60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Hỗ trợ nhiều ngân hàng
                        </li>
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 13L9 17L19 7" stroke="#27AE60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Quy trình đơn giản, bảo mật
                        </li>
                    </ul>
                </div>
            )
        },
        {
            id: 'hotel',
            label: 'Thanh toán tại khách sạn',
            subContent: (
                <div className="hotel-payment-info">
                    <p>Bạn sẽ thanh toán trực tiếp khi nhận phòng tại khách sạn.</p>
                    <p>Vui lòng mang theo CMND/CCCD và thông tin đặt phòng.</p>
                </div>
            )
        },
    ];

    const handleSelectMethod = (methodId) => {
        setSelectedMethod(methodId);
        setSelectedSubOption(null);
    };

    const handleSelectSubOption = (subOptionId) => {
        setSelectedSubOption(subOptionId);
    };

    const formatPrice = (price) => {
        if (!price) return '';
        const number = parseInt(price.replace(/[^0-9]/g, '')) || 0;
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    };

    return (
        <div className="payment-container">
            <div className="payment-header">
                <h2>Chọn phương thức thanh toán</h2>
                <p>Vui lòng chọn phương thức thanh toán bạn muốn sử dụng</p>
            </div>

            <div className="payment-methods">
                {paymentMethods.map((method) => (
                    <div key={method.id} className={`method-card ${selectedMethod === method.id ? 'active' : ''}`}>
                        <div
                            className="method-header"
                            onClick={() => handleSelectMethod(method.id)}
                        >
                            <div className="radio-container">
                                <div className={`custom-radio ${selectedMethod === method.id ? 'checked' : ''}`}>
                                    {selectedMethod === method.id && <div className="radio-dot"></div>}
                                </div>
                            </div>
                            <span className="method-label">{method.label}</span>
                            {method.discount && (
                                <span className="discount-badge">Giảm giá</span>
                            )}
                        </div>

                        {selectedMethod === method.id && (
                            <div className="method-details">
                                {method.subOptions && (
                                    <div className="sub-options">
                                        {method.subOptions.map((sub) => (
                                            <div
                                                key={sub.id}
                                                className={`sub-option ${selectedSubOption === sub.id ? 'active' : ''}`}
                                                onClick={() => handleSelectSubOption(sub.id)}
                                            >
                                                <div className="radio-container">
                                                    <div className={`custom-radio small ${selectedSubOption === sub.id ? 'checked' : ''}`}>
                                                        {selectedSubOption === sub.id && <div className="radio-dot"></div>}
                                                    </div>
                                                </div>
                                                {sub.logo && (
                                                    <img src={sub.logo} alt={sub.label} className="wallet-logo" />
                                                )}
                                                <span className="sub-option-label">{sub.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {(selectedMethod === method.id && method.subContent && !method.subOptions) ||
                                (selectedSubOption && method.subOptions?.find(s => s.id === selectedSubOption)?.subContent) ? (
                                    <div className="payment-content">
                                        {selectedSubOption
                                            ? method.subOptions.find(s => s.id === selectedSubOption).subContent
                                            : method.subContent}
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="payment-summary">
                <div className="summary-row">
                    <span>Tổng thanh toán:</span>
                    <span className="total-price">{formatPrice(roomData?.price)}</span>
                </div>

                {selectedMethod === 'payos' ? (
                    <button
                        onClick={async () => {
                            if (isLoading) return;
                            setIsLoading(true);
                            try {
                                const amount = parseInt(roomData.price.replace(/[^0-9]/g, '')) || 100000;
                                const response = await axios.post('/create-payment-link', {
                                    amount: amount,
                                });
                                window.location.href = response.data.checkoutUrl;
                            } catch (error) {
                                console.error('Error:', error);
                                alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
                            } finally {
                                setIsLoading(false);
                            }
                        }}
                        className="payment-button payos"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Thanh toán qua PayOS'}
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            if (selectedMethod === 'ewallet' && !selectedSubOption) {
                                alert('Vui lòng chọn ví điện tử');
                                return;
                            }
                            onPaymentConfirm(selectedMethod + (selectedSubOption ? `-${selectedSubOption}` : ''));
                        }}
                        className="payment-button confirm"
                    >
                        {selectedMethod === 'hotel' ? 'Xác nhận đặt phòng' : 'Tiếp tục thanh toán'}
                    </button>
                )}

                <div className="terms-conditions">
                    <p>Bằng việc tiếp tục, bạn đồng ý với <a href="#">Điều khoản & Điều kiện</a> và <a href="#">Chính sách bảo mật</a> của chúng tôi.</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;