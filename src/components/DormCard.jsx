import '../css/dormcard.css';
import placeholderImage from '../assets/empty.png';

const DormCard = ({ listing , images}) => {

  // safely look for the first image URL from yoru foreign key join 
  const displayImage = images && images.length > 0
    ? images[0].image_url
    : placeholderImage
  return (
    <div  className="dorm-card">
      <div className="image-container">
        <img 
          src={displayImage} className="dorm-image"
        />
      </div>
      <div className="details-container">
        <h4>{listing.name}</h4>
        <div className="price-row">
          <span className="price">₱{listing.price.toLocaleString()}</span>
          <span className="per-month-text">/month</span>
        </div>
        <span >{listing.tenant_type}</span>

        <div className="specs-row">
          <span>Type: {listing.type}</span>
          <span>|</span>
          <span>Capacity: {listing.capacity}</span>
        </div>
        
        <div className="specs-row">
          <span>Visitors: {listing.visitors_allowed ? 'Allowed' : 'Strictly No'}</span>
          <span>|</span>
          <span>Cooking: {listing.cooking_allowed ? 'Allowed' : 'No'}</span>
        </div>

        <div className="specs-row">
          <span>Pets: {listing.pets_allowed ? 'Allowed' : 'No'}</span>
          <span>|</span>
          <span>Aircon: {listing.has_aircon ? 'Yes' : 'No'}</span>
        </div>
      </div>
    </div>
  );
};

export default DormCard;