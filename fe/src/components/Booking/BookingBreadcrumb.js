import React from 'react';
import './global.scss';

const steps = [
    { key: 'hotel', label: 'Hotel Detail' },
    { key: 'booking', label: 'Your Info' },
    { key: 'payment', label: 'Payment' },
    { key: 'confirm', label: 'Confirmation' }
];

const BookingBreadcrumb = ({ currentStep, setCurrentStep }) => {
    const currentIndex = steps.findIndex(step => step.key === currentStep);

    return (
        <div className="booking-breadcrumb">
            {steps.map((step, index) => (
                <div key={step.key} className="step">
                    {index > 0 && <span className="separator"> › </span>}
                    {index <= currentIndex ? (
                        <button
                            onClick={() => setCurrentStep(step.key)}
                            className={`step button ${step.key === currentStep ? 'active' : ''}`}
                        >
                            {step.label}
                        </button>
                    ) : (
                        <span className="step span">{step.label}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BookingBreadcrumb;