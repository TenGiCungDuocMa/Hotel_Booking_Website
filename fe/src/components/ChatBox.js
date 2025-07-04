import React, {useEffect, useState} from "react";

function Chatbot() {
    const [showBot, setShowBot] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            const script = document.createElement("script");
            script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
            script.async = true;
            script.crossOrigin = "anonymous";
            document.body.appendChild(script);
            setShowBot(true);
        },1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {showBot && (
                <df-messenger
                    intent="bookinghotelroom"
                    chat-title="BookingOT"
                    agent-id="56740b10-0f43-4900-9419-7e27f9df46d6"
                    language-code="en"
                    chat-icon="/chatbot.png"
                ></df-messenger>
            )}
        </>
    );
}

export default Chatbot;
