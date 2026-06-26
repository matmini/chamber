import { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 

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
      <div>
        Listing does not exist.
      </div>
    );
  }
  return (
    <div>
      {listing.name}
    </div>
  );
}