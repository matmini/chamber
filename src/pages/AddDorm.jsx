import { useState } from 'react'; 
import { supabase } from '../supabaseClient'; 
import { useNavigate, Link } from 'react-router-dom'; 

export default function AddDorm() {
  const [dormName, setDormName] = useState(''); 
  const [price, setPrice] = useState(''); 
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState(''); 
  const navigate = useNavigate(); 

  const handleAddDorm = async (e) => {
    e.preventDefault(); 
    const { error } = await supabase.from('dorms').insert(
      [
        {
          name: dormName,
          price: Number(price),
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }
      ]
    );

    if (error) console.log(`[ERROR] ${error.message}`) 
    else {
      navigate('/'); // dashboard
    }
  }; 

  return (
    <div>
      <h2>Add Dorm Page </h2>
      <Link to="/">Back to Listings</Link>
      <hr /> 
      <form onSubmit={handleAddDorm}>
        <input type="text" placeholder="Dorm Name" value={dormName} onChange={e => setDormName(e.target.value)} required /><br></br>
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required /><br></br>
        <input type="number" step="any" placeholder="Latitude" value={lat} onChange={e => setLat(e.target.value)} required /><br></br>
        <input type="number" step="any" placeholder="Longitude" value={lng} onChange={e => setLng(e.target.value)} required /><br></br>
        <button type="submit">Save Listing</button>
      </form>
    </div>
  )
}