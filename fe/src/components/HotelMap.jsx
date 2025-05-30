import { useEffect, useState } from 'react';
import {geocodeAddress} from "../utils/Geocode";
import Map from "../components/Map"

const HotelPage = () => {
    const [hotelLocation, setHotelLocation] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        const fetchCoordinates = async () => {
            const hotelAddress = 'hẻm 39 Lý Thường Kiệt, phường 7, Quận 11, Hồ Chí Minh';
            const hotelCoords = await geocodeAddress(hotelAddress);
            setHotelLocation(hotelCoords);

            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (err) => {
                    console.error('Lỗi định vị người dùng:', err);
                }
            );
        };

        fetchCoordinates();
    }, []);

    return hotelLocation && userLocation ? (
        <Map hotelLocation={hotelLocation} userLocation={userLocation} />
    ) : (
        <p>Đang tải bản đồ...</p>
    );
};

export default HotelPage;
