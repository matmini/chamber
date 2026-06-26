import placeholderImage from '../assets/empty.png';

const DormCard = ({ listing , images, onClick}) => {

  // safely look for the first image URL from yoru foreign key join 
  const displayImage = images && images.length > 0
    ? images[0].image_url
    : placeholderImage
  return (
    <div id="card" class="flex flex-col w-43 h-62.5
                          group cursor-pointer
                          ">
      <div id="image-container" class="w-full h-43 rounded-2xl overflow-hidden">
        <img src={displayImage} class="w-full h-full object-cover"/>
      </div>
      <div class="flex flex-col text-start py-2">
        <h5 id="price" class="group-hover:underline font-semibold">PHP{Number(listing.price).toLocaleString()}/mo</h5>
        <h6 id="name" class="text-[12px] -my-1 group-hover:underline">{listing.name}</h6>
        <p class="text-[11px] text-gray-400 group-hover:underline line-clamp-1">9706 Banahaw St., Umali Subdivision umali subdivisodfjskdfjskdfj sdfjisdfjsi fsjidfji fsijdfjsi</p>
      </div>

    </div>
    // <div  className="dorm-card" onClick={onClick}>
    //   <img src={displayImage} className="card-picture"/>

    //   <div className="card-info-overlay">
    //     <h4 className="card-name">{listing.name}</h4>
    //     <div className="card-meta">
    //       <span className="card-price">₱{Number(listing.price).toLocaleString()}/mo</span>
    //       {listing.rating? (
    //         <span className="card-rating">⭐ {listing.rating.toFixed(1)}</span>
    //       ): (
    //         <span className="card-rating-new">New</span>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default DormCard;