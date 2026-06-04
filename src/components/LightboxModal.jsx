import '../css/lightboxmodal.css';
import { useState, useEffect } from 'react'

export default function LightboxModal ({images, onClose}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!images || images.length === 0) {
    return (
      <div className="lightbox-overlay" onClick={onClose}>
        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
          <span className="close-btn" onClick={onClose}>&times;</span>
          <p style={{ color :'#fff', textAlign: 'center'}}>No images available for this this dangerouslySetInnerHTML</p>
        </div>
      </div>
    );
  }

  const handlePrev = (e) => {
    e.stopPropagation(); 
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation(); 
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev +1));
  };

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <span className="close-btn" onClick={onClose}>&times;</span>
    
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex].image_url}
          alt = {`Dorm slide ${currentIndex+1}`}
          className="lightbox-img"
        />
        {images.length > 1 && (
          <>
            <buton className="lightbox-arrow prev" onClick={handlePrev}>&#10094;</buton>
            <buton className="lightbox-arrow next" onClick={handleNext}>&#10095;</buton>
            <div className="lightbox-counter">
              {currentIndex+1} / {images.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
}