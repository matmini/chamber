import '../css/dashboard.css';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom'; 
import DormCard from '../components/DormCard.jsx';
import Leaflet from '../components/Leaflet.jsx';
export default function Dashboard() {
  const [listings, setListings] = useState([]); 
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(7500);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageFiles, setImageFiles] = useState()
  // Effect 1 : Fetch all images 
  useEffect(()=> {
    async function fetchAllImages() {
      try {
        const { data, error } = await supabase.from('dorm_images').select('*');
        if (error) throw error; 
        setImageFiles(data);
        console.log(`[IMAGES FETCHED]`);
        console.log(data);
      } catch ( error ){
        console.error(`[ERROR] Wasn't able to fetch images. ${error.message}`);
      }
    }
    fetchAllImages();
  }, []);

  useEffect(() => {
    // set a timer to fetch data after 300ms of silence
    const delayDebounceFn = setTimeout(async () => {
      console.log("[FETCHING] Dorms from Supabase...");
      
      let query = supabase
        .from('dorms')
        .select('*')
        .lte('price', maxPrice);
      
      if (searchTerm.trim() !=='') {
        query = query.ilike('name', `%${searchTerm}%`);
        // % characters mean "match nyting before or after this text"
      }

      const { data, error } = await query;

      setLoading(false);
      if (!error) setListings(data);

      console.log(`[SUCCESS] Data fetched from Supabase`)
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [maxPrice, searchTerm]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login'); 
  }

  if (loading) return <p>Loading awesome dorms...</p>

  return (
    <div className="container">
      <div className="nav">
        <div className="nav-left">
          <h3>chamber</h3>
          <div className="search-container">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              className="search-input" type="text" placeholder="Search dorm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div class="nav-right">
          <Link to="/add">+ Add New Dorm Listing</Link> 
          <button onClick={handleLogout}>Sign out</button>
         </div>
      </div>
      <div id="div-split">
        <div className='right-column'>
          <Leaflet listings={listings}></Leaflet>
        </div>
        <div className='left-column'>
          <h3>Active Listings ({listings.length})</h3>
          <label>Max Price: ₱{maxPrice}</label>
          <input type="range" min="1000" max="10000" step="500"value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))} />
          
          {listings.map(listing => {
            // filter the image pool for rows matching the specific dorm id 
            const images = imageFiles.filter(img => img.dorm_id === listing.id); 
            return (
              <div key={listing.id}>
                <DormCard key={listing.id} listing={listing} images={images}/>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}