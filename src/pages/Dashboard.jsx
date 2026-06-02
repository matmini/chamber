import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom'; 

export default function Dashboard() {
  const [listings, setListings] = useState([]); 
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      const {data, error} = await supabase.from('dorms').select('*');
      if(!error) setListings(data);
      setLoading(false);
    }
    fetchListings();
  }, []);

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
      {listings.map(item => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Php {item.price}/month</p>
        </div>
      ))}
    </div>
  )
}