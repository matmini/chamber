
import '../css/dormrow.css';
import DormCard from './DormCard';

import { useState } from 'react';


export default function DormRow({ title, dorms, images }){
  const [activeImages, setActiveImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 


  if (!dorms || dorms.length === 0) {
    return (
      <div className="dorm-row">
        <h2 className="row-title">{title}</h2>
        <p className="no-results-text">No listings available in this category.</p>
      </div>
    );
  }

  console.log(`${title}- (${dorms.length}) dorms.  [${images}] images`);
  return (

    <div className="dorm-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-posters">
        {dorms.map((dorm) => {
          const dormImages = (images && images.length > 0)
            ? images.filter(img => img.dorm_id === dorm.id)
            : [];
          return(
            <DormCard 
              key={dorm.id} 
              listing={dorm} 
              images={dormImages}
              onClick={() => {
                setActiveImages(images);
                setIsModalOpen(true)
                // console.log(`${dorm.name} clicked. ${images.length} photos`)
              }}
            />
          )
        })}
      </div>
    </div>


  );

}