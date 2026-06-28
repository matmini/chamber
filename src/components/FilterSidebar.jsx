import { useState } from 'react';

export default function FilterSidebar({ selectedTypes, setSelectedTypes }) {
  // Track selected apartment types

  const apartmentTypes = [
    { id: 'studio', label: 'Studio' },
    { id: '1br', label: '1 Bedroom' },
    { id: '2br', label: '2 Bedroom' }
  ];
  const genderTypes = [
    { id: 'coed', label: 'COED' },
    { id: 'female', label: 'Female' },
    { id: 'male', label: 'Male' }
  ];
  const features = [
    { id: 'ref', label: 'With Ref'},
    { id: 'aircon', label: 'With aircon'},
    { id: 'parking', label: 'With parking'},
    { id: 'curfew', label: 'With curfew'}, 
    { id: 'cooking', label: 'Cooking allowed'},
    { id: 'pets', label: 'Pets allowed'}, 
    { id: 'visitors', label: 'Visitors allowed'}
  ]
  const handleCheckboxChange = (id) => {
    let updatedTypes;
    
    if (selectedTypes.includes(id)) {
      // If already selected, remove it from the array
      updatedTypes = selectedTypes.filter(type => type !== id);
    } else {
      // If not selected, add it to the array
      updatedTypes = [...selectedTypes, id];
    }

    setSelectedTypes(updatedTypes);
    
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Apartment Type</h3>
      
      <div className="space-y-2.5">
        {apartmentTypes.map((type) => (
          <label key={type.id} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900">
            <input
              type="checkbox"
              checked={selectedTypes.includes(type.id)}
              onChange={() => handleCheckboxChange(type.id)}
              className="h-4 w-4  cursor-pointer"
            />
            <span>{type.label}</span>
          </label>
        ))}
      </div>
      <h3 className="text-sm font-semibold text-gray-900 my-3">Tenants</h3>
      <div className="space-y-2.5">
        {genderTypes.map((type) => (
          <label key={type.id} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900">
            <input
              type="checkbox"
              checked={selectedTypes.includes(type.id)}
              onChange={() => handleCheckboxChange(type.id)}
              className="h-4 w-4 cursor-pointer"
            />
            <span>{type.label}</span>
          </label>
        ))}
      </div>
      
      <h3 className="text-sm font-semibold text-gray-900 my-3">Others</h3>
      <div className="space-y-2.5">
        {features.map((type) => (
          <label key={type.id} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900">
            <input
              type="checkbox"
              checked={selectedTypes.includes(type.id)}
              onChange={() => handleCheckboxChange(type.id)}
              className="h-4 w-4  cursor-pointer"
            />
            <span>{type.label}</span>
          </label>
        ))}
      </div>

    </div>
  );
}