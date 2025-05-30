import React, { useState } from 'react';

const PaymentForm = ({ bookingData, roomData, onPaymentConfirm }) => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [selectedSubOption, setSelectedSubOption] = useState(null);

    const paymentMethods = [
        {
            id: 'vietqr',
            label: 'VietQR',
            subContent: (
                <div className="mt-3 text-base text-gray-600">
                    <p>Make sure you have any e-wallet or mobile banking app that supports payment with VietQR.</p>
                    <p>A QR code will appear after you click the "Pay" button. Simply save or screenshot the QR code to complete your payment within the time limit.</p>
                    <p>Please use the latest QR code provided to complete your payment.</p>
                </div>
            ),
        },
        {
            id: 'ewallet',
            label: 'E-Wallet',
            subOptions: [
                { id: 'zalopay', label: 'ZaloPay', logo: 'https://via.placeholder.com/40?text=ZaloPay' },
                { id: 'other', label: 'Other E-Wallets', logos: ['https://via.placeholder.com/40?text=MoMo', 'https://via.placeholder.com/40?text=PayPay'] },
            ],
        },
        { id: 'atm', label: 'ATM Cards/Mobile Banking' },
        { id: 'credit', label: 'Credit Card/Debit Card' },
        { id: 'store', label: 'Pay at Store' },
        { id: 'vietinbank', label: 'VietinBank Transfer', subContent: <p className="mt-3 text-base text-gray-600">Only available 00:00 - 23:00</p> },
        { id: 'installment', label: 'Credit Card Installment', subContent: <p className="mt-3 text-base text-gray-600">Below minimum amount</p> },
    ];

    const handleSelectMethod = (methodId) => {
        if (selectedMethod === methodId) {
            setSelectedMethod(null);
            setSelectedSubOption(null);
        } else {
            setSelectedMethod(methodId);
            setSelectedSubOption(null); // Reset sub-option when changing method
        }
    };

    const handleSelectSubOption = (subOptionId) => {
        setSelectedSubOption(subOptionId);
    };

    return (
        <div className="max-w-[760px] mx-auto p-8 bg-white shadow-md rounded-lg">
            <div className="bg-blue-50 p-6 rounded-t-lg mb-6">
                <p className="text-xl text-blue-700 font-semibold">We're holding this price for you! Let's complete your payment in <span className="text-green-600">00:54:40</span> ✅</p>
            </div>
            <h2 className="text-2xl font-bold mb-6">How would you like to pay?</h2>
            <div className="space-y-6">
                {paymentMethods.map((method) => (
                    <div key={method.id}>
                        <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="paymentMethod"
                                checked={selectedMethod === method.id}
                                onChange={() => handleSelectMethod(method.id)}
                                className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-4 text-lg font-medium">{method.label}</span>
                            {method.id === 'vietqr' && <span className="ml-auto text-green-600 text-sm">Enjoy Discount</span>}
                        </label>
                        {selectedMethod === method.id && method.subContent && method.subContent}
                        {selectedMethod === method.id && method.subOptions && (
                            <div className="ml-10 mt-4 space-y-4">
                                {method.subOptions.map((subOption) => (
                                    <label key={subOption.id} className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name={`subOption-${method.id}`}
                                            checked={selectedSubOption === subOption.id}
                                            onChange={() => handleSelectSubOption(subOption.id)}
                                            className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-4 text-lg">{subOption.label}</span>
                                        {subOption.logo && <img src={subOption.logo} alt={subOption.label} className="ml-auto w-10 h-10" />}
                                        {subOption.logos && (
                                            <div className="ml-auto flex space-x-4">
                                                {subOption.logos.map((logo, index) => (
                                                    <img key={index} src={logo} alt="E-Wallet Logo" className="w-10 h-10" />
                                                ))}
                                            </div>
                                        )}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <label className="block text-lg font-medium text-gray-700">Apply Coupons</label>
                <div className="flex space-x-4 mt-2">
                    <input
                        type="text"
                        placeholder="Enter coupon code or select available coupon(s)"
                        className="mt-1 block w-full border rounded-md p-3 text-lg"
                    />
                    <button className="mt-1 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 text-lg">Apply</button>
                </div>
            </div>
            <div className="mt-8">
                <p className="text-lg font-bold">Total Price</p>
                <button
                    onClick={() => {
                        if (!selectedMethod) {
                            alert('Please select a payment method.');
                            return;
                        }
                        onPaymentConfirm(selectedMethod); // gửi về cho BookingPage
                    }}
                    className="w-full bg-orange-500 text-white p-4 rounded-md text-xl font-semibold hover:bg-orange-600"
                >
                    Pay & Show QR Code 1,423,422 VND
                </button>

                <p className="mt-3 text-sm text-gray-600">
                    By continuing to pay, you have agreed to Traveloka's Terms & Conditions and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default PaymentForm;