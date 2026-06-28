import { useState } from 'react'; 
import { supabase } from '../supabaseClient'; 
import { useNavigate, Link } from 'react-router-dom'; 



export default function CreateListing() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    price: '',
    type: 'studio',          // default fallback choice
    tenant_type: 'coed',      // default fallback choice
    lat: '',
    lng: '',
    // Amenities & Rules (Booleans)
    has_ref: false,
    has_aircon: false,
    has_parking: false,
    with_curfew: false,
    cooking_allowed: false,
    pets_allowed: false,
    laundry_allowed: false,
    visitors_allowed: false,
    phone: ''
  });

  const navigate = useNavigate(); 

  const [imageFiles, setImageFiles] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Generic text/select change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Generic checkbox toggle handler
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Submitting form data:", formData);
  //   // Trigger your fetch POST request to your backend here...
  // };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setUploading(true); 
    // setMessage({ type: '', text: ''});
    try {
      // grab the token from supabase client instance 
      const { data: { session }} = await supabase.auth.getSession();
      const token = session?.access_token; 
      console.log("token:", token)
      const response = await fetch('http://localhost:5000/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json(); 
      console.log(result);
      if (response.ok) {
        alert('Listing submitted successfully!');
        
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Network submission failed:", error);
    }
      
    // try{
    //   const newDormId = newDorm.id; 

    //   // Loop through the selected image files and upload them 
    //   // to the storage
    //   setUploading(true);
    //   if (imageFiles.length > 0) {
    //     const imageRows = []; 
    //     // standard for loop to handle async sequential uploads smoothly
    //     for (const file of imageFiles){
    //       const fileExt = file.name.split('.').pop(); 
    //       const fileName = `${Date.now()}-${Math.random().toString(36).substr(2,9)}.${fileExt}`;
    //       const filePath = `${fileName}`; 

    //       // upload current file to the bucket 
    //       const { error: uploadError } = await supabase
    //         .storage
    //         .from('dorm-images')
    //         .upload(filePath, file);

    //       if (uploadError) throw uploadError; 

    //       // get the public url for the file 
    //       const { data } = supabase
    //         .storage
    //         .from('dorm-images')
    //         .getPublicUrl(filePath); 
          
    //       // structure the row data to match our new 'dorm_images' table layout 
    //       imageRows.push({
    //         dorm_id: newDormId, 
    //         image_url: data.publicUrl
    //       });
    //     }

    //     // insert all image links into the dorm_images table  
    //     const { error: imagesInsertError } = await supabase
    //       .from('dorm_images')
    //       .insert(imageRows);
    //     if (imagesInsertError) throw imagesInsertError;
    //   }
    //   navigate('/');

    // } catch (error) {
    //   console.error('[ERROR]', error.message);
    // } finally {
    //   setUploading(false);
    // }
  }; 

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm space-y-6 my-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Create New Listing</h2>
        <p className="text-sm text-gray-500">Provide accurate details about the property around UPLB.</p>
      </div>

      {/* --- SECTION 1: CORE DETAILS --- */}
      <div className="space-y-4 border-t border-gray-100 pt-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Core Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Name / Title</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g., Demarces Centtro Studio Room" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Complete Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="e.g., F.O. Santos St., Brgy. Batong Malake" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (Monthly PHP)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="e.g., 5000" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white">
              <option value="studio">Studio</option>
              <option value="1br">1 Bedroom</option>
              <option value="2br">2 Bedroom</option>
              <option value="many_br">3+ Bedroom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity/room</label>
            <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required placeholder="e.g., 2" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tenants</label>
            <select name="tenant_type" value={formData.tenant_type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white">
              <option value="coed">Coed / Mixed</option>
              <option value="female">Female Only</option>
              <option value="male">Male Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: LOCATION & DISTANCE --- */}
      <div className="space-y-4 border-t border-gray-100 pt-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Location Metrics</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
            <input type="number" step="any" name="lat" value={formData.lat} onChange={handleChange} required placeholder="14.1675" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
            <input type="number" step="any" name="lng" value={formData.lng} onChange={handleChange} required placeholder="121.2418" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>

        </div>
      </div>

      {/* --- SECTION 3: AMENITIES & RULES --- */}
      <div className="space-y-4 border-t border-gray-100 pt-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Features & House Rules</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'has_aircon', label: 'Air Conditioning' },
            { id: 'has_ref', label: 'Refrigerator Included' },
            { id: 'has_parking', label: 'Parking Space Available' },
            { id: 'with_curfew', label: 'Has House Curfew' },
            { id: 'cooking_allowed', label: 'Cooking Allowed' },
            { id: 'pets_allowed', label: 'Pets Allowed' },
            { id: 'laundry_allowed', label: 'Laundry Allowed' },
            { id: 'visitors_allowed', label: 'Visitors Allowed' }
          ].map((item) => (
            <label key={item.id} className="flex items-center gap-3 p-2 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer text-sm text-gray-600">
              <input
                type="checkbox"
                name={item.id}
                checked={formData[item.id]}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* --- SUBMIT BUTTON --- */}
      <div className="pt-4 border-t border-gray-100">
        <button type="submit" className="w-full bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-sm transition-colors">
          Submit Listing
        </button>
      </div>
    </form>
  );
}