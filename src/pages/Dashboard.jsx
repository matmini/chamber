import '../css/dashboard.css';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom'; 
import DormCard from '../components/DormCard.jsx';
import Leaflet from '../components/Leaflet.jsx';
import LightboxModal from '../components/LightboxModal.jsx';
export default function Dashboard() {
  const [listings, setListings] = useState([]); 
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(7500);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageFiles, setImageFiles] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [activeImages, setActiveImages] = useState([]);
  const [filters, setFilters] = useState({
    type: 'any-type',
    gender: 'coed',
    capacity: 'any-capacity'
  });

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
      
      // general query for getting all dorms
      let query = supabase.from('dorms').select('*');

      // search filter
      if (searchTerm.trim() !=='') { 
        query = query.ilike('name', `%${searchTerm}%`); 
      }
      
      // price filter
      query = query.lte('price', maxPrice); 

      // type filter -- apply no filter if any-type
      if (filters.type !== 'any-type'){
        query = query.eq('type', filters.type);
      }

      // gender filter -- apply no filter if any-gender
      if (filters.gender !== 'any-gender'){
        query = query.eq('tenant_type', filters.gender);
      }

      // capacity filter 
      if (filters.capacity !== 'any-capacity'){
        query = query.eq('capacity', filters.capacity);
      }

      const { data, error } = await query;

      setLoading(false);
      // console.log(filters);
      if (!error) setListings(data);
      console.log(`[SUCCESS] Data fetched from Supabase`);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [maxPrice, searchTerm, filters]);

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
        <div className="nav-right">
          <Link to="/add">+ Add New Dorm Listing</Link> 
          <button onClick={handleLogout}>Sign out</button>
         </div>
      </div>
      <div id="div-split">
        <div className='left-column'>
          <Leaflet listings={listings}></Leaflet>
        </div>
        <div className='right-column'>
          <h3>Active Listings ({listings.length})</h3>
          <div className="div-max-price">
            <label>Max Price: ₱{maxPrice}</label>
            <input type="range" min="1000" max="10000" step="500"value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))} 
            />
          </div>

          <form className="filter-form">
            <select className="select" id="type-filter" name="type" onChange={handleOptionFilterChange}>
                <option value="any-type">Any type</option>
                <option value="studio">Studio Type </option>
                <option value="1-room">1-Room</option>
                <option value="2-room">2-Room</option>
                <option value="3-or-more">3+ Rooms</option>
            </select>
            <select className="select" id="capacity-filter" name="capacity" onChange={handleOptionFilterChange}>
                <option value="any-capacity">Any capacity</option>
                <option value="1">Solo</option>
                <option value="2">2/room</option>
                <option value="3">3/room</option>
                <option value="4">4/room</option>
                <option value="4-or-more">4+/room</option>
            </select>
            <select className="select" id="gender-filter" name="gender" onChange={handleOptionFilterChange}>
                <option value="any-gender">Any gender</option>
                <option value="female">Females only</option>
                <option value="male">Males only</option>
                <option value="mixed">Mixed/Coed</option>
            </select>

          </form>
          {listings.map(listing => {
            // filter the image pool for rows matching the specific dorm id 
            const images = imageFiles.filter(img => img.dorm_id === listing.id); 
            return (
              <div key={listing.id}>
                <DormCard 
                  key={listing.id} 
                  listing={listing} 
                  images={images}
                  onClick={() => {
                    setActiveImages(images);
                    setIsModalOpen(true)
                    // console.log(`${listing.name} clicked. ${images.length} photos`)
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {isModalOpen && (
        <LightboxModal
          images={activeImages}
          onClose={() => {
            setIsModalOpen(false);
            setActiveImages([]);
          }}  
        />
      )}
    </div>
  )
}