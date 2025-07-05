import React, { useEffect, useState } from "react";

function Chatbot() {
    const [showBot, setShowBot] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const isScriptLoaded = document.querySelector('script[src*="dialogflow-console"]');
            if (!isScriptLoaded) {
                const script = document.createElement("script");
                script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
                script.async = true;
                script.crossOrigin = "anonymous";
                document.body.appendChild(script);
            }
            setShowBot(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const speak = (text) => {
        if (!window.speechSynthesis) return;

        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        utter.pitch = 1;
        utter.rate = 1;
        utter.volume = 1;
        window.speechSynthesis.speak(utter);
    };

    useEffect(() => {
        const handleResponse = (event) => {
            const message = event?.data?.message;

            if (!message) {
                console.log("No message found in event:", event?.data);
                return;
            }

            if (typeof message.text === "string") {
                speak(message.text);
            } else if (Array.isArray(message.text)) {
                message.text.forEach((line) => speak(line));
            } else {
                console.log("No readable message", event.data);
            }
        };

        window.addEventListener("df-response-received", handleResponse);

        return () => {
            window.removeEventListener("df-response-received", handleResponse);
        };
    }, []);

    return (
        <>
            {showBot && (
                <df-messenger
                    key={localStorage.getItem("token")}
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
