export const geocodeAddress = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
    )}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
            },
        });
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
            };
        } else {
            throw new Error('Không tìm thấy tọa độ');
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
};
