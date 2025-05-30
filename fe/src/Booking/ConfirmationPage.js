import React from 'react';

const Section = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow space-y-2">
        <h3 className="text-xl font-semibold text-blue-700 border-b pb-2">{title}</h3>
        {children}
    </div>
);

const InfoItem = ({ label, value }) => (
    <p className="text-gray-700">
        <span className="font-medium">{label}:</span> {value}
    </p>
);

const ConfirmationPage = ({ bookingData, roomData, paymentMethod }) => {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed</h2>
                <p className="text-gray-600 text-lg">Thank you for booking with us! Below are your reservation details.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Section title="Personal Details">
                    <InfoItem label="Name" value={`${bookingData.firstName} ${bookingData.lastName}`} />
                    <InfoItem label="Email" value={bookingData.email} />
                    <InfoItem label="Phone" value={bookingData.phone} />
                    <InfoItem label="Country" value={bookingData.country} />
                </Section>

                <Section title="Room Details">
                    <InfoItem label="Hotel" value={roomData.hotelName} />
                    <InfoItem label="Room" value={roomData.roomType} />
                    <InfoItem label="Check-in" value={roomData.checkInDate} />
                    <InfoItem label="Check-out" value={roomData.checkOutDate} />
                    <InfoItem label="Guests" value={roomData.capacity} />
                    <InfoItem label="Price" value={roomData.price} />
                </Section>
            </div>

            <Section title="Payment">
                <InfoItem label="Selected Method" value={paymentMethod} />
                <p className="text-sm text-gray-500 mt-2">
                    You’ll receive a payment receipt via email shortly. Please save your QR code or transaction record.
                </p>
            </Section>

            <div className="text-center pt-4">
                <p className="text-gray-600">Need help? Contact our support anytime.</p>
                <p className="text-sm text-gray-400">TravelApp © 2025</p>
            </div>
        </div>
    );
};

export default ConfirmationPage;
