// Import the useState Hook from the React library
import  { useState } from 'react';

// Import the raw data array from our local file
import { dormsData } from './dormData';

function App() {
  // Initialize state : maxPrice holds the value, setMaxPrice is the functionto change it
  const [maxPrice, setMaxPrice] = useState(7000)

  const filteredDorms = dormsData.filter(dorm => dorm.price <= maxPrice) 

  return (
    <div>
      <header>
        <h1>chamber.com</h1>
      </header>

      <div>
        {/* Left Side: Dynamic Listings */}
        <div>
          <h2>Dorm Listings</h2>
          
          <label>Max Budget: Php {maxPrice}</label>
          <input type="range" min="1500" max="10000" step="500" value={maxPrice} onChange={(event)=> setMaxPrice(Number(event.target.value))}/>

          {/* 2. Map over the array to transform data objects into UI elements */}
          {filteredDorms.map((dorm) => {
            return (
              <div key={dorm.id}>
                <h3>{dorm.name}</h3>
                <p>Price: Php {dorm.price}/month</p>
                <p>Type: {dorm.type}</p>
              </div>
            );
          })}

        </div>

        {/* Right Side: Map Placeholder */}
        <div>
          <p>Map Placeholder</p>
        </div>
      </div>
    </div>
  );
}

export default App;