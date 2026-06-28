import { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom'; 
import { Phone, Heart, AirVent, PawPrint, UsersRound, WashingMachine, CookingPot , Venus, Mars, VenusAndMars, Leaf } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Leaflet  from '../components/Leaflet.jsx'

export default function ListingPage() {
  const { id } = useParams();
  const [ listing, setListing ] = useState(null);
  const [ images, setImages ] = useState(null);
  const [ imageIndex, setImageIndex] = useState(0);


  const handleNext = () => {
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev+1));
  }
  
  const handlePrev = () => {
    setImageIndex((prev) => (prev === 0  ? images.length-1 : prev-1));
  }

  useEffect(()=> {
    const fetchPageData = async()=> {
      try {
        const response = await fetch(`http://localhost:5000/listings/${id}`);
        if (!response.ok) throw new Error('Listing not found');
        const data = await response.json(); 
        setListing(data);
        setImages(data.images || []);
        console.log('images:',data.images)
      } catch (error) {
        console.error("Error loading page dataset: ", error);
      }

    }
    fetchPageData();
  }, [id]);

  if (!listing) {
    return (
      <div className="bg-red-200 w-full h-screen flex flex-col justify-center items-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="mx-auto w-5xl h-screen flex flex-row justify-center place-self-center">
      <div id="left" className='py-10  w-[60%]' >
        <h1 id="name" className="text-4xl font-circular">{listing.name}</h1>
        <div id="image-viewer" className="relative my-4 w-full aspect-6/4 overflow-hidden">
          <img 
            src={images[imageIndex] } 
            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-105 pointer-events-none"
          />
          <div className="relative w-full h-full flex items-center justify-center z-5">
            <img 
              src={images[imageIndex] } 
              className="w-full h-full object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              <button onClick={handlePrev}
                      className='absolute left-4 top-1/2 -translate-y-1/2 bg-gray-100 p-1.5 rounded-full hover:bg-gray-200 cursor-pointer z-10'
                      >
                <ChevronLeft className="size-7"></ChevronLeft>
              </button>
              <button onClick={handleNext}
                      className='absolute right-4 top-1/2 -translate-y-1/2 bg-gray-100 p-1.5 rounded-full hover:bg-gray-200 cursor-pointer z-10'
              >
                <ChevronRight className="size-7"></ChevronRight>
              </button>
            </>
          )}
        </div>
        <h2 className="text-lg font-medium">Apartment Features</h2>
        <div id="features-block" 
            className='text-sm text-white
                      flex flex-row flex-wrap gap-2.5 py-1
            '>
          <div id="tenant-type" className="flex flex-row gap-3 bg-[#ff7070] px-3 py-2 rounded-full">
            {listing.tenant_type === 'female' ? (
              <Venus strokeWidth={1} className="size-5"></Venus>
            ) : listing.tenant_type === 'male' ? (
              <Mars strokeWidth={1} className="size-5"></Mars>
            ) : (
              <VenusAndMars strokeWidth={1} className="size-5"></VenusAndMars>
            )}
            <p>{listing.tenant_type}</p>
          </div>
          <div id="aircon" className="flex flex-row gap-3 bg-[#ff7070] px-3 py-2 rounded-full">
            <AirVent strokeWidth={1} className="size-5"></AirVent>
            <p>{listing.has_aircon ? "With Aircon" : "No Aircon"}</p>
          </div>
          <div id="visitors" className="flex flex-row gap-3 bg-[#ff7070]  px-3 py-2 rounded-full">
            <UsersRound strokeWidth={1} className="size-5"></UsersRound>
            <p>{listing.visitors_allowed ? "Visitors Allowed" : "Visitors Not Allowed"}</p>
          </div>
          <div id="cooking" className="flex flex-row gap-3 bg-[#ff7070] px-3 py-2 rounded-full">
            <CookingPot strokeWidth={1} className="size-5"></CookingPot>
            <p>{listing.cooking_allowed ? "Cooking Allowed" : "Cooking Not Allowed"}</p>
          </div>
          <div id="pets" className="flex flex-row gap-3 bg-[#ff7070] px-3 py-2 rounded-full">
            <PawPrint strokeWidth={1} className="size-5"></PawPrint>
            <p>{listing.pets_allowed ? "Pets Allowed" : "Pets Not Allowed"}</p>
          </div>
          <div id="wash" className="flex flex-row gap-3 bg-[#ff7070] px-3 py-2 rounded-full">
            <WashingMachine strokeWidth={1} className="size-5"></WashingMachine>
            <p>{listing.laundry_allowed ? "Laundry Allowed" : "Laundry Not Allowed"}</p>
          </div>
        </div>
      </div>
      <div id="right" className=" py-10 pl-5  w-[40%] flex flex-col items-center gap-5" >
        <button id="add-to-favorites" className='self-end text-[12px] bg-red-200 text-[rgb(172,51,51)]  px-6 py-2 rounded-full
                            flex flex-row gap-2 items-center
                            border border-[rgb(172,51,51)]
                            hover:bg-white'>
          Add to favorites
          <Heart strokeWidth={1} className='size-5'></Heart>
        </button>

        <Leaflet listing={listing}></Leaflet>
        <div id="call" class=" flex gap-5 items-center ">
          <Phone></Phone>
          <p id="phone-number" className="text-xl">09228065791</p>
        </div>
      </div> 
    </div>
  );
}