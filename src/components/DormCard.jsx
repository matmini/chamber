import '../css/dormcard.css';
import placeholderImage from '../assets/empty.png';

const DormCard = ({ listing , images, onClick}) => {

  // safely look for the first image URL from yoru foreign key join 
  const displayImage = images && images.length > 0
    ? images[0].image_url
    : placeholderImage
  return (
    <div  className="dorm-card" onClick={onClick}>
      <img src={displayImage} className="card-picture"/>

      <div className="card-info-overlay">
        <h4 className="card-name">{listing.name}</h4>
        <div className="card-meta">
          <span className="card-price">₱{Number(listing.price).toLocaleString()}/mo</span>
          {listing.rating? (
            <span className="card-rating">⭐ {listing.rating.toFixed(1)}</span>
          ): (
            <span className="card-rating-new">New</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DormCard;