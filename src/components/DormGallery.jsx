import DormCard from './DormCard';

import { useState } from 'react';


export default function Gallery({ dorms, images }){
  const [activeImages, setActiveImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 


  if (!dorms || dorms.length === 0) {
    return (
      <div className="dorm-row">
        <p className="no-results-text">No listings available in this category.</p>
      </div>
    );
  }

  return (
    <div id="dorm-gallery"
      className="w-full grid grid-cols-[repeat(auto-fill,minmax(172px,1fr))] gap-4 justify-items-center
                md:max-w-250
                border-2">
      {dorms.map((dorm) => {
        const dormImages = (images && images.length > 0)
          ? images.filter(img => img.dorm_id === dorm.id)
          : [];
        return(
          <DormCard 
            key={dorm.id} 
            listing={dorm} 
            images={dormImages}
          />
        )
      })}
    </div>
  );

}