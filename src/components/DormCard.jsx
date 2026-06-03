import React from 'react';


const DormCard = ({ listing }) => {
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

  return (
    <div  className="dorm-card">
      <div>
        <span >{dorm.tenantType} only</span>
        <h4>{dorm.name}</h4>
      </div>

      <p>₱ {dorm.price.toLocaleString()}/month</p>

      {/* Amenity & Type Details Grid */}
      <div >
        <div>🏠 <strong>{dorm.type}</strong></div>
        <div>👥 Max {dorm.capacity} pax</div>
        <div>❄️ Aircon: {dorm.hasAircon ? 'Yes' : 'No'}</div>
        <div>🚪 Visitors: {dorm.allowVisitors ? 'Allowed' : 'Strictly No'}</div>
        <div>🍳 Cooking: {dorm.allowCooking ? 'Allowed' : 'No'}</div>
        <div>🐕 Pets: {dorm.allowPets ? 'Allowed' : 'No'}</div>
      </div>
    </div>
  );
};

export default DormCard;