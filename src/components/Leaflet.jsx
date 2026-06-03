import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 1. Delete the broken default URL handler
delete L.Icon.Default.prototype._getIconUrl;

// 2. Re-configure the default icon to point to official unpkg CDN assets
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Leaflet( {listings}) {
  const defaultCoordinates = [14.168740,121.244345] // demarces area

  return (
  <MapContainer center={defaultCoordinates} zoom={14} scrollWheelZoom={true} style={{height: '250px', width: '400px'}} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {listings.map((listing) => (
      <Marker key={listing.id}  position={[listing.lat, listing.lng]}>
        <Popup>
          {listing.name} <br /> ₱{listing.price}
        </Popup>
      </Marker>
    ))}
  </MapContainer>
  )
}