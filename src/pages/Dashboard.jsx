import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom'; 
import Leaflet from '../components/Leaflet.jsx';
import LightboxModal from '../components/LightboxModal.jsx';
import Navbar from '../components/Navbar.jsx';
import DormGallery from '../components/DormGallery.jsx';
export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [listings, setListings] = useState([]); 
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(7500);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageFiles, setImageFiles] = useState()
  const [filters, setFilters] = useState({
    type: 'any-type',
    gender: 'coed',
    capacity: 'any-capacity'
  });

  const [user, setUser] = useState(null);

  // Effect 1 : Get User Data & Fetch all dorm images 
  useEffect(()=> {
    async function getAllDorms(){
      try {
        const response = await fetch(`http://localhost:5000/listings?search=${searchQuery}`);
        const data = await response.json(); 
        setListings(data);
        // console.log('done');
      } catch (error) {
        console.error("Error fetching listings: ", error);
      }
      setLoading(false);
    }
    async function getUserData(){
      const { data: { user }} = await supabase.auth.getUser();
      setUser(user);
    }
    async function fetchAllImages() {
      try {
        const { data, error } = await supabase.from('dorm_images').select('*');
        if (error) throw error; 
        setImageFiles(data);
        // console.log(`[IMAGES FETCHED]`);
        // console.log(data);
      } catch ( error ){
        console.error(`[ERROR] Wasn't able to fetch images. ${error.message}`);
      }
    }
    getUserData();
    getAllDorms();
    fetchAllImages();

  }, [searchQuery]);



  
  const petFriendlyDorms = listings.filter(listing => listing.pets_allowed === true);
  const budgetDorms = listings.filter(listing => listing.price < 2500);
  const femaleOnlyDorms = listings.filter(listing => listing.tenant_type === 'female'); 
 
  const handleOptionFilterChange = (e) => {
    const { name, value } = e.target; 
    console.log(`Update ${name} to ${value}`);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value // Dynamically updates 'gender', 'distance', or 'capacity'
    }));
  }
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login'); 
  }

  if (loading) 
    return (
      <p style={{ color :'#fff', textAlign: 'center'}}>Loading awesome dorms...</p>
    )
    

  return (
    <div className="flex flex-col items-center ">
      {/* <Navbar></Navbar> */}
      <div id="search-container" 
            className="px-3 py-8 w-full max-w-xl">
        <input type="text" placeholder="Search dorms or apartments" 
                value={searchQuery}
                onChange={(e)=> setSearchQuery(e.target.value)}
                className="w-full px-4 py-2  bg-gray-100 rounded-full focus:outline-none"/>
      </div>
      
      <DormGallery dorms={listings} images={imageFiles}/> 
    </div>
  )
}