import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
export default function Leaflet( {listings}) {
  console.log(listings);
  const position = [14.167405,121.243347]; 

  return (
  <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{height: '250px', width: '400px'}} >
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