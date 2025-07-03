import React, { useEffect, useState } from "react";
import ReviewSection from "../components/ReviewSection";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ReviewPage = () => {
    const banners = [
        "/bg_1.jpg", "/bg_2.jpg", "/bg_4.jpg"
    ];
    const titles1 = [
        "More than a hotel... an experience",
        "Where luxury meets comfort",
        "Unwind in style and elegance"
    ];
    const titles2 = [
        "Discover the perfect blend of luxury and comfort",
        "Experience the ultimate in hospitality",
        "Your dream vacation starts here"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Header />
            <div className="banner" style={{ position: "relative", textAlign: "center" }}>
                <img
                    style={{
                        maxWidth: "100%",
                        filter: "brightness(55%)",
                        height: "auto"
                    }}
                    src={banners[currentIndex]}
                    alt="BookingOT"
                />
                <div
                    className="banner-text"
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "35%",
                        transform: "translateX(-50%)",
                        textAlign: "center"
                    }}
                >
                    <h1
                        style={{
                            color: "#f1905b",
                            fontSize: "16px",
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                            fontWeight: 700
                        }}
                    >
                        {titles1[currentIndex]}
                    </h1>
                    <h2
                        style={{
                            color: "white",
                            fontSize: "6vw",
                            fontWeight: 700,
                            lineHeight: 1
                        }}
                    >
                        {titles2[currentIndex]}
                    </h2>
                </div>
            </div>

            <div className="container py-5">
                <ReviewSection />
            </div>
            <Footer/>
        </>
    );
};

export default ReviewPage;
