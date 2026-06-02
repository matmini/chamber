import { useState } from 'react'; 
import { supabase } from '../supabaseClient'; 
import { useNavigate, Link } from 'react-router-dom'; 

export default function AddDorm() {
  const [dormName, setDormName] = useState(''); 
  const [price, setPrice] = useState(''); 
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState(''); 
  const navigate = useNavigate(); 

  const [imageFiles, setImageFiles] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleAddDorm = async (e) => {
    e.preventDefault(); 

    try {
      const { data: newDorm, error: dormError } = await supabase
        .from('dorms')
        .insert(
          [
            {
              name: dormName,
              price: Number(price),
              lat: parseFloat(lat),
              lng: parseFloat(lng)
            }
          ]
        )
        .select() // .select() is require to get back the newly generated Dorm ID 
        .single();
      
      if (dormError) console.log(dormError);
      console.log(`${dormName} added to table dorms`)
      
      const newDormId = newDorm.id; 

      // Loop through the selected image files and upload them 
      // to the storage
      setUploading(true);
      if (imageFiles.length > 0) {
        const imageRows = []; 
        // standard for loop to handle async sequential uploads smoothly
        for (const file of imageFiles){
          const fileExt = file.name.split('.').pop(); 
          const fileName = `${Date.now()}-${Math.random().toString(36).substr(2,9)}.${fileExt}`;
          const filePath = `${fileName}`; 

          // upload current file to the bucket 
          const { error: uploadError } = await supabase
            .storage
            .from('dorm-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError; 

          // get the public url for the file 
          const { data } = supabase
            .storage
            .from('dorm-images')
            .getPublicUrl(filePath); 
          
          // structure the row data to match our new 'dorm_images' table layout 
          imageRows.push({
            dorm_id: newDormId, 
            image_url: data.publicUrl
          });
        }

        // insert all image links into the dorm_images table  
        const { error: imagesInsertError } = await supabase
          .from('dorm_images')
          .insert(imageRows);
        if (imagesInsertError) throw imagesInsertError;
      }
      navigate('/');

    } catch (error) {
      console.error('[ERROR]', error.message);
    } finally {
      setUploading(false);
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

        <label>Dorm Image:</label>
        <input 
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImageFiles(Array.from(e.target.files))} // Convert FileList object to standard JS Array
        />
        <button type="submit">
          {uploading ?  `Uploading ${imageFiles.length} images...`: 'Add Dorm'}
        </button>
      </form>
    </div>
  )
}