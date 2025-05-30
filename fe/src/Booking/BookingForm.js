import React, { useState } from 'react';

const BookingForm = ({ onBookingSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: 'Vietnam',
        phone: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.firstName.trim()) tempErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) tempErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
            tempErrors.phone = 'Phone number is required';
        } else if (!/^\+?[\d\s-]{9,}$/.test(formData.phone)) {
            tempErrors.phone = 'Phone number is invalid';
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onBookingSubmit(formData);
            alert('Booking details submitted successfully!');
        }
    };

    return (
        <div className="max-w-[680px] mx-auto p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Enter your details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex space-x-6">
                    <div className="flex-1">
                        <label className="block text-lg font-medium text-gray-700">First name *</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`mt-2 block w-full border rounded-md p-3 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.firstName && <p className="text-red-500 text-base mt-2">{errors.firstName}</p>}
                    </div>
                    <div className="flex-1">
                        <label className="block text-lg font-medium text-gray-700">Last name *</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`mt-2 block w-full border rounded-md p-3 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.lastName && <p className="text-red-500 text-base mt-2">{errors.lastName}</p>}
                    </div>
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Email address *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-2 block w-full border rounded-md p-3 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-base mt-2">{errors.email}</p>}
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Country/Region *</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="mt-2 block w-full border rounded-md p-3 border-gray-300"
                    >
                        <option value="Vietnam">Vietnam</option>
                        {/* Add more countries as needed */}
                    </select>
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Phone number *</label>
                    <div className="flex">
                        <select
                            name="phoneCode"
                            value="+84"
                            onChange={handleChange}
                            className="mt-2 w-36 border rounded-l-md p-3 border-gray-300"
                        >
                            <option value="+84">VN +84</option>
                            {/* Add more country codes as needed */}
                        </select>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`mt-2 block w-full border rounded-r-md p-3 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        />
                    </div>
                    {errors.phone && <p className="text-red-500 text-base mt-2">{errors.phone}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 text-lg"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default BookingForm;