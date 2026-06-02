import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom'; 
import DormCard from '../components/DormCard.jsx';

export default function Dashboard() {
  const [listings, setListings] = useState([]); 
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [searchTerm, setSearchTerm] = useState('');

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
    <div>
      <div>
        <h2>Dashboard Page</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <Link to="/add">+ Add New Dorm Listing</Link> 

      <h3>Active Listings ({listings.length})</h3>
      <label>Max Price: ₱{maxPrice}</label>
      <input type="range" min="1000" max="10000" step="500"value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />

      <div>
        <label>Search: </label>
        <input 
          type="text"
          placeholder="Search dorm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {listings.map(item => (
        <div key={item.id}>
          <DormCard key={item.id} listing={item}/>
        </div>
      ))}
    </div>
  )
}