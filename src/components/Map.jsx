import Leaflet from "./Leaflet.jsx"
export default function Map ({listings}) {
  return(
    <div className="map-container">
      <div className="map">
        <Leaflet listings={listings}></Leaflet>
      </div>
      {/* Fade overlay to math the Netflix dark aesthetic */}
      <div className="map-fade-bottom" /> 

      {/* Floating Info Card  */} 
      <div className="map-floating-card">
        <h1>Your home away from home.</h1>
        <p>Explore verified student dorms and boarding houses near your campus.</p>
        <button className="btn-primary">View Full Map</button>
      </div>
    </div>
  )
}