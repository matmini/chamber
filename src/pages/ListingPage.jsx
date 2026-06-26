import { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { Heart, AirVent, PawPrint, UsersRound, WashingMachine, CookingPot , Venus, Mars, VenusAndMars } from 'lucide-react';

export default function ListingPage() {
  const { id } = useParams();
  const [ listing, setListing ] = useState(null);
  useEffect(()=> {
    const fetchPageData = async()=> {
      try {
        const response = await fetch(`http://localhost:5000/listings/${id}`);
        if (!response.ok) throw new Error('Listing not found');
        const data = await response.json(); 
        setListing(data);
      } catch (error) {
        console.error("Error loading page dataset: ", error);
      }
    }
    fetchPageData();
  }, [id]);

  if (!listing) {
    return (
      <div className="bg-amber-500 w-full h-screen flex flex-col justify-center items-center">
        Loading...
      </div>
    );
  }
  return (
    <div className=" w-4xl h-screen flex flex-row justify-center place-self-center">
      <div id="left" className='py-10  w-[65%]' >
        <h1 id="name" className="text-4xl  font-circular">{listing.name}</h1>

        <h2 className="text-lg font-medium">Apartment Features</h2>
        <div id="features-block" 
            className='text-sm text-white
                      flex flex-row flex-wrap gap-2.5 py-5
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
      <div id="right" className="py-10  w-[35%] flex flex-col items-end" >
        <button className=' text-[12px] bg-red-200 text-[rgb(172,51,51)]  px-6 py-2 rounded-full
                            flex flex-row gap-2 items-center
                            border border-[rgb(172,51,51)]
                            hover:bg-white'>
          Add to favorites
          <Heart strokeWidth={1} className='size-5'></Heart>
          </button>
        {/* <h1>{listing.name}</h1> */}
      </div> 
    </div>
  );
}