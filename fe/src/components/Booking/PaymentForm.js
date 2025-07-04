import React, { useState } from "react";
import axios from "axios";
import logoZalo from "../../assets/PNG/Logo FA-13.png";
import logoMomo from "../../assets/momo-primary-logo/MoMo Primary Logo/png/momo_icon_square_pinkbg_RGB.png";
import qrZalo from "../../assets/Screenshot_20240118_092516.jpg";
import qrMomo from "../../assets/239039221.jpg";
import "./global.scss";

const PaymentForm = ({ bookingData, roomData, onPaymentConfirm }) => {
    const [selectedMethod, setSelectedMethod] = useState("hotel");
    const [selectedSubOption, setSelectedSubOption] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const paymentMethods = [
        {
            id: "vietqr",
            label: "VietQR",
            discount: true,
            subContent: (
                <div className="qr-content">
                    <img
                        src="https://img.vietqr.io/image/MB-30110300003770-compact.png"
                        alt="QR VietQR"
                        className="qr-image"
                    />
                    <div className="qr-instructions">
                        <p>
                            <span>1.</span> Open a banking app or e-wallet that supports VietQR
                        </p>
                        <p>
                            <span>2.</span> Scan the QR code above
                        </p>
                        <p>
                            <span>3.</span> Verify the information and confirm the payment
                        </p>
                        <div className="timer">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="#FF4757"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            QR code is valid for 15 minutes
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: "ewallet",
            label: "E-Wallet",
            subOptions: [
                {
                    id: "zalopay",
                    label: "ZaloPay",
                    logo: logoZalo,
                    subContent: (
                        <div className="qr-content">
                            <img src={qrZalo} alt="QR ZaloPay" className="qr-image" />
                            <div className="qr-instructions">
                                <p>
                                    <span>1.</span> Open the ZaloPay app
                                </p>
                                <p>
                                    <span>2.</span> Select the "Scan code" feature
                                </p>
                                <p>
                                    <span>3.</span> Scan the QR code above to make payment
                                </p>
                                <div className="timer">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                            stroke="#FF4757"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    QR code is valid for 15 minutes
                                </div>
                            </div>
                        </div>
                    ),
                },
                {
                    id: "momo",
                    label: "MoMo",
                    logo: logoMomo,
                    subContent: (
                        <div className="qr-content">
                            <img src={qrMomo} alt="QR MoMo" className="qr-image" />
                            <div className="qr-instructions">
                                <p>
                                    <span>1.</span> Open the MoMo app
                                </p>
                                <p>
                                    <span>2.</span> Select the "Scan code" feature
                                </p>
                                <p>
                                    <span>3.</span> Scan the QR code above to make payment
                                </p>
                                <div className="timer">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                            stroke="#FF4757"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    QR code is valid for 15 minutes
                                </div>
                            </div>
                        </div>
                    ),
                },
            ],
        },
        {
            id: "payos",
            label: "PayOS Payment",
            subContent: (
                <div className="payos-content">
                    <p>You will be redirected to PayOS's secure payment page to complete the transaction.</p>
                    <ul className="benefits">
                        <li>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 13L9 17L19 7"
                                    stroke="#27AE60"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Payment with domestic bank cards
                        </li>
                        <li>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 13L9 17L19 7"
                                    stroke="#27AE60"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Supports multiple banks
                        </li>
                        <li>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 13L9 17L19 7"
                                    stroke="#27AE60"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Simple and secure process
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: "hotel",
            label: "Pay at Hotel",
            subContent: (
                <div className="hotel-payment-info">
                    <p>You will pay directly upon check-in at the hotel.</p>
                    <p>Please bring your ID card and booking information.</p>
                </div>
            ),
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
        if (!price) return "0 VNĐ";

        // Handle both string and number inputs
        let number;
        if (typeof price === 'string') {
            number = parseInt(price.replace(/[^0-9]/g, "")) || 0;
        } else {
            number = parseInt(price) || 0;
        }

        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(number);
    };

    // Calculate total price (no discount)
    const calculateTotalPrice = () => {
        if (!roomData?.price || !roomData?.checkInDate || !roomData?.checkOutDate) return 0;
        // Parse price properly
        const parsePrice = (priceString) => {
            if (!priceString) return 0;
            const cleanPrice = priceString.toString().replace(/[^0-9.]/g, '');
            return parseFloat(cleanPrice) || 0;
        };
        const pricePerNight = parsePrice(roomData.price);
        const checkIn = new Date(roomData.checkInDate);
        const checkOut = new Date(roomData.checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        return pricePerNight * nights;
    };

    const totalPrice = calculateTotalPrice();

    const madonhang = localStorage.getItem('madonhang');

    const handlePayOSPayment = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            // Ensure booking data is always saved before redirect
            localStorage.setItem('bookingData', JSON.stringify(bookingData));
            localStorage.setItem('roomData', JSON.stringify(roomData));
            localStorage.setItem('madonhang', madonhang);
            const paymentData = {
                amount: totalPrice,
                description: madonhang,
                orderCode: madonhang,
                returnUrl: `${window.location.origin}/payment-success`,
                cancelUrl: `${window.location.origin}/payment-cancel`,
                items: [
                    {
                        name: `Room ${roomData?.hotelName || "unknown"}`,
                        quantity: 1,
                        price: totalPrice,
                    },
                ],
                currency: "VND",
            };
            // Save description for PayOS
            localStorage.setItem('paymentDescription', madonhang);
            const response = await axios.post("http://localhost:8888/api/create-payment-link", paymentData, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.data?.checkoutUrl) {
                window.location.href = response.data.checkoutUrl;
            } else {
                throw new Error("No payment URL received from server");
            }
        } catch (error) {
            console.error("PayOS Payment Error:", error);
            const errorMessage = error.response?.data?.details || error.message || "An error occurred while creating the payment link. Please try again.";
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="payment-container">
            <div className="payment-header">
                <h2>Select Payment Method</h2>
                <p>Please choose the payment method you wish to use</p>
            </div>

            <div className="payment-methods">
                {paymentMethods.map((method) => (
                    <div
                        key={method.id}
                        className={`method-card ${selectedMethod === method.id ? "active" : ""}`}
                    >
                        <div className="method-header" onClick={() => handleSelectMethod(method.id)}>
                            <div className="radio-container">
                                <div
                                    className={`custom-radio ${selectedMethod === method.id ? "checked" : ""}`}
                                >
                                    {selectedMethod === method.id && <div className="radio-dot"></div>}
                                </div>
                            </div>
                            <span className="method-label">{method.label}</span>
                            {method.discount && <span className="discount-badge">Discount</span>}
                        </div>

                        {selectedMethod === method.id && (
                            <div className="method-details">
                                {method.subOptions && (
                                    <div className="sub-options">
                                        {method.subOptions.map((sub) => (
                                            <div
                                                key={sub.id}
                                                className={`sub-option ${selectedSubOption === sub.id ? "active" : ""}`}
                                                onClick={() => handleSelectSubOption(sub.id)}
                                            >
                                                <div className="radio-container">
                                                    <div
                                                        className={`custom-radio small ${
                                                            selectedSubOption === sub.id ? "checked" : ""
                                                        }`}
                                                    >
                                                        {selectedSubOption === sub.id && (
                                                            <div className="radio-dot"></div>
                                                        )}
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

                                {(selectedMethod === method.id &&
                                    method.subContent &&
                                    !method.subOptions) ||
                                (selectedSubOption &&
                                    method.subOptions?.find((s) => s.id === selectedSubOption)?.subContent) ? (
                                    <div className="payment-content">
                                        {selectedSubOption
                                            ? method.subOptions.find((s) => s.id === selectedSubOption).subContent
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
                    <span>Total Payment:</span>
                    <span className="total-price">{formatPrice(totalPrice)}</span>
                </div>

                {selectedMethod === "payos" ? (
                    <button
                        onClick={handlePayOSPayment}
                        className="payment-button payos"
                        disabled={isLoading || !totalPrice}
                    >
                        {isLoading ? "Processing..." : "Pay via PayOS"}
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            if (selectedMethod === "ewallet" && !selectedSubOption) {
                                alert("Please select an e-wallet");
                                return;
                            }
                            // Save description for all payment methods
                            localStorage.setItem('paymentDescription', madonhang);
                            localStorage.setItem('madonhang', madonhang);
                            onPaymentConfirm(
                                selectedMethod + (selectedSubOption ? `-${selectedSubOption}` : "")
                            );
                        }}
                        className="payment-button confirm"
                        disabled={isLoading}
                    >
                        {selectedMethod === "hotel" ? "Confirm Booking" : "Continue Payment"}
                    </button>
                )}

                <div className="terms-conditions">
                    <p>
                        By continuing, you agree to our{" "}
                        <a href="/terms">Terms & Conditions</a> and{" "}
                        <a href="/privacy">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;