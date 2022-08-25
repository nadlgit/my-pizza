import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const markerIcon = new L.Icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

export type MapProps = { latitude?: number; longitude?: number };

export const Map = ({ latitude = 0, longitude = 0 }: MapProps) => {
  const position = [latitude, longitude] as L.LatLngExpression;
  return (
    <MapContainer
      center={position}
      zoom={17}
      zoomControl={false}
      scrollWheelZoom={'center'}
      touchZoom={'center'}
      dragging={true}
      attributionControl={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} interactive={false} icon={markerIcon}></Marker>
    </MapContainer>
  );
};
