import {MapContainer, TileLayer, Marker, useMap, Popup} from 'react-leaflet';
import 'leaflet-routing-machine';
import {useEffect, useRef} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createCustomIcon = (iconUrl) => {
    return L.divIcon({
        html: `<img src="${iconUrl}" style="width:100%;height:100%"/>`,
        iconSize: [32, 32],
        className: 'custom-leaflet-icon'
    });
};

const userIcon = createCustomIcon('/location.png');
const hotelIcon = createCustomIcon('/5-stars.png');

const Routing = ({origin, destination}) => {
    const map = useMap();
    const routingControlRef = useRef(null);

    useEffect(() => {
        if (!map || !origin || !destination) return;

        // Nếu đã có routing control cũ, xóa nếu nó còn nằm trên map
        if (routingControlRef.current && map.hasLayer(routingControlRef.current)) {
            map.removeControl(routingControlRef.current);
        }

        const control = L.Routing.control({
            waypoints: [
                L.latLng(origin.lat, origin.lng),
                L.latLng(destination.lat, destination.lng),
            ],
            lineOptions: {
                styles: [{color: 'blue', weight: 4}],
            },
            show: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            routeWhileDragging: false,
        });

        control.addTo(map);
        routingControlRef.current = control;

        return () => {
            if (
                routingControlRef.current &&
                map.hasLayer(routingControlRef.current)
            ) {
                map.removeControl(routingControlRef.current);
            }
        };
    }, [origin, destination, map]);


    return null;
};

const Map = ({hotelLocation, userLocation}) => {
    console.log("hotelLocation:", hotelLocation);
    console.log("userLocation:", userLocation);
    useEffect(() => {
        const cleanup = () => {
            document.querySelectorAll('.leaflet-marker-icon:not(.custom-leaflet-icon)')
                .forEach(el => el.remove());
        };

        cleanup();
        const interval = setInterval(cleanup, 500);

        return () => clearInterval(interval);
    }, []);
    return (
        <MapContainer
            center={hotelLocation}
            zoom={13}
            style={{height: '200px', width: '100%'}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={userLocation} icon={userIcon}>
                <Popup>Vị trí của bạn</Popup>
            </Marker>

            <Marker position={hotelLocation} icon={hotelIcon}>
                <Popup>Khách sạn</Popup>
            </Marker>

            <Routing origin={userLocation} destination={hotelLocation}/>
        </MapContainer>
    );
};

export default Map;
