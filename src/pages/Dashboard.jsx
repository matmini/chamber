import '../css/dashboard.css';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom'; 
import DormCard from '../components/DormCard.jsx';
import Leaflet from '../components/Leaflet.jsx';
import LightboxModal from '../components/LightboxModal.jsx';
import Map from '../components/Map.jsx';
import DormRow from '../components/DormRow.jsx';
import Navbar from '../components/Navbar.jsx';
import DormGallery from '../components/DormGallery.jsx';
export default function Dashboard() {
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
      const { data, error } = await supabase
        .from('dorms')
        .select('*');
      if (error) {
        console.error('Error fetching dorms: ', error);
      } else {
        setListings(data)
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
        console.log(`[IMAGES FETCHED]`);
        // console.log(data);
      } catch ( error ){
        console.error(`[ERROR] Wasn't able to fetch images. ${error.message}`);
      }
    }
    getUserData();
    getAllDorms();
    fetchAllImages();

  }, []);

  
  const petFriendlyDorms = listings.filter(listing => listing.pets_allowed === true);
  const budgetDorms = listings.filter(listing => listing.price < 2500);
  const femaleOnlyDorms = listings.filter(listing => listing.tenant_type === 'female'); 
  // console.log(`Pet Friendly Dorms: ${femaleOnlyDorms[0].name}`);
/*
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
*/
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
      <Navbar></Navbar>
      {/* <div className="nav">
        <div className="nav-left">
          <h3>chamber</h3>
          <div className="search-container">
            <input 
              className="search-input" type="text" placeholder="Search dorm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="nav-right">
          <Link to="/add">Add New Listing</Link> 
          <button onClick={handleLogout}>Sign out</button>
         </div>
      </div> */}

      <Map listings={listings}/>

      <div className="rows-container">
        <DormRow title="Budget-Friendly (Under₱2.5k)" dorms={budgetDorms} images={imageFiles}/> 
        <DormRow title="Pet-Friendly Dorms" dorms={petFriendlyDorms} images={imageFiles}/> 
        <DormRow title="Ladies' Dormitories" dorms={femaleOnlyDorms} images={imageFiles}/> 
        <DormGallery title="All Dorms" dorms={listings} images={imageFiles}/> 
      </div> 

      {/* <div id="div-split">
        <div className='left-column'>
          {user ? (
            <div>Logged in as {user.email}</div>
          ): (
            <p>Loading profile</p>
          )}
        </div>
        <div className='right-column'>
          <h3>Active Listings ({listings.length})</h3>
          <div className="div-max-price">
            <label>Max Price: ₱{maxPrice}</label>
            <input className="slider" type="range" min="1000" max="10000" step="500"value={maxPrice}
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
      </div> */}


    </div>
  )
}