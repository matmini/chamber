import React from 'react'; 

// Simple inline styles for a clean card look
const cardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '16px',
  margin: '12px 0',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  backgroundColor: '#fff',
  transition: 'transform 0.2s, box-shadow 0.2s',
};

const priceStyle = {
  color: '#2ecc71',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  margin: '8px 0 0 0',
};

const titleStyle = {
  margin: '0 0 8px 0',
  color: '#333',
};

const DormCard = ({ listing }) => {
  return (
    <div style={cardStyle} className="dorm-card">
      <h4 style={titleStyle}>{listing.name}</h4>
      <p style={priceStyle}>₱ {listing.price.toLocaleString()}/month</p>
    </div>
  );
};

export default DormCard;