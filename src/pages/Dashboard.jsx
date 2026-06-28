import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom'; 
import Leaflet from '../components/Leaflet.jsx';
import LightboxModal from '../components/LightboxModal.jsx';
import Navbar from '../components/Navbar.jsx';
import DormGallery from '../components/DormGallery.jsx';
import { ChevronDown, ArrowUpDown } from 'lucide-react';
export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState("");
  const [listings, setListings] = useState([]); 
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [imageFiles, setImageFiles] = useState()
  

  const [user, setUser] = useState(null);

  // Effect 1 : Get User Data & Fetch all dorm images 
  useEffect(()=> {
    async function getAllDorms(){
      try {
        const response = await fetch(`http://localhost:5000/listings?search=${searchQuery}&sort=${sortBy}`);
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

  }, [searchQuery, sortBy]);


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
      <div id="filters" 
            className="px-3 py-8 w-full max-w-xl">
        <input id="search" type="text" placeholder="Search dorms or apartments" 
                value={searchQuery}
                onChange={(e)=> setSearchQuery(e.target.value)}
                className="w-full px-4 py-2  bg-gray-100 rounded-full focus:outline-none"
        />
        <div id="summary-and-sort" className="flex justify-between ">
          <div id="summary">
            {searchQuery!=='' && 
              <div>
                <h1 className="text-xl font-semibold">{searchQuery}</h1>
                <p1 className="text-gray-500 text-[12px]">{listings.length} listings found for "{searchQuery}"</p1>
              </div>
            }
          </div>
          <div id="sort-by" className='flex items-center gap-2 py-3 px-3 self-end'>
            <p className='text-sm'>Sort By</p>
            <div className="relative w-48">
              {/* The Select Dropdown */}
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-700 shadow-sm  focus:outline-none"
              >
                <option value="">Best Match</option>
                <option value="price-asc">Price low to high</option>
                <option value="price-desc">Price high to low</option>
                <option value="distance-asc">Nearest to UP Gate</option>
              </select>

              {/* The Lucide Icon layered on top */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
        
      </div>


      
      <DormGallery dorms={listings} images={imageFiles}/> 

    </div>
  )
}