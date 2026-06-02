import React from 'react';

const cardStyle = {
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const headerStyle = {
  margin: 0,
  fontSize: '1.25rem',
  color: '#1a202c',
};

const priceStyle = {
  color: '#2ecc71',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  margin: 0,
};

// Style for the Male/Female/Coed pill tag
const tagStyle = (type) => ({
  display: 'inline-block',
  padding: '4px 10px',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: '600',
  width: 'fit-content',
  backgroundColor: type === 'Female' ? '#fce7f3' : type === 'Male' ? '#dbeafe' : '#e2e8f0',
  color: type === 'Female' ? '#9d174d' : type === 'Male' ? '#1e40af' : '#475569',
});

const infoGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
  fontSize: '0.9rem',
  color: '#4a5568',
  borderTop: '1px solid #edf2f7',
  paddingTop: '12px',
};

const DormCard = ({ listing }) => {
  const dorm = {
    name : listing.name,
    price  : listing.price,
    type : listing.type,
    capacity : listing.capacity,
    hasAircon : listing.has_aircon, 
    tenantType: listing.tenant_type,
    allowVisitors: listing.visitors_allowed,
    allowCooking : listing.cooking_allowed
  }

  return (
    <div style={cardStyle} className="dorm-card">
      <div>
        <span style={tagStyle(dorm.tenantType)}>{dorm.tenantType} Only</span>
        <h4 style={headerStyle}>{dorm.name}</h4>
      </div>

      <p style={priceStyle}>₱ {dorm.price.toLocaleString()}/month</p>

      {/* Amenity & Type Details Grid */}
      <div style={infoGridStyle}>
        <div>🏠 <strong>{dorm.type}</strong></div>
        <div>👥 Max {dorm.capacity} pax</div>
        <div>❄️ Aircon: {dorm.hasAircon ? 'Yes' : 'No'}</div>
        <div>🚪 Visitors: {dorm.allowVisitors ? 'Allowed' : 'Strictly No'}</div>
        <div>🍳 Cooking: {dorm.allowCooking ? 'Allowed' : 'No'}</div>
      </div>
    </div>
  );
};

export default DormCard;