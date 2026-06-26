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

export default function Leaflet({listing}) {
  const defaultCoordinates = [14.163877,121.207558] // demarces area

  return (
    /* Leaflet containers MUST have an explicit height and width to render */
    <div className="w-full h-[200px]  rounded-md overflow-hidden shadow-xs border border-gray-100 z-0">
      <MapContainer 
        center={[listing.lat, listing.lng]} 
        zoom={16} 
        scrollWheelZoom={true} 
        className="w-full h-full "
      >
        {/* OpenStreetMap public map tile layer wrapper */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={[listing.lat, listing.lng]}>
          <Popup>
            <div className="font-circular text-xs font-semibold">
              {listing.name || "Dorm Location"}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}