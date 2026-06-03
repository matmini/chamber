import '../css/dormcard.css';
import placeholderImage from '../assets/empty.png';

const DormCard = ({ listing , images}) => {
  const dorm = {
    name : listing.name,
    price  : listing.price,
    type : listing.type,
    capacity : listing.capacity,
    hasAircon : listing.has_aircon, 
    tenantType: listing.tenant_type,
    allowVisitors: listing.visitors_allowed,
    allowCooking : listing.cooking_allowed,
    allowPets : listing.pets_allowed,
  }

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
        <h4>{dorm.name}</h4>
        <div className="price-row">
          <span className="price">₱{listing.price.toLocaleString()}</span>
          <span className="per-month-text">/month</span>
        </div>
        <span >{dorm.tenantType} only</span>

        <div className="specs-row">
          <span>{listing.type}</span>
          <span>|</span>
          <span>{listing.tenantType}</span>
          <span>|</span>
          <span>{listing.capacity}</span>
        </div>
        
        <div className="specs-row">
          <span>Visitors: {listing.allowVisitors ? 'Allowed' : 'Strictly No'}</span>
          <span>|</span>
          <span>Cooking: {listing.allowCooking ? 'Allowed' : 'No'}</span>
          <span>|</span>
          <span>Pets: {listing.allowPets ? 'Allowed' : 'No'}</span>
          <span>|</span>
          <span>Aircon: {listing.hasAircon ? 'Yes' : 'No'}</span>
        </div>
      </div>
    </div>
  );
};

export default DormCard;