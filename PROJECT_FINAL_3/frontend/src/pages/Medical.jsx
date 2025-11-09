import React, { useState } from 'react';
import medicines from '../data/medicines';

const Medical = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const toggleDetails = (medicineId) => {
    setSelectedMedicine(selectedMedicine === medicineId ? null : medicineId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-2">Medicines</h1>
      <p className="text-gray-600 mb-8">Browse our wide range of medicines at discounted prices</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="flex flex-col">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <img 
                src={medicine.image} 
                alt={medicine.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{medicine.name}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-bold">₹{medicine.price}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    {medicine.discount}% off
                  </span>
                </div>
                <p className="text-gray-500 text-sm">MRP: ₹{medicine.mrp}</p>
                <p className="text-gray-600 mt-2">{medicine.description}</p>
                <button
                  onClick={() => toggleDetails(medicine.id)}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  {selectedMedicine === medicine.id ? 'Hide' : 'Show'} Alternatives
                </button>
              </div>
            </div>
            
            {selectedMedicine === medicine.id && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Available Alternatives:</h4>
                {medicine.alternatives.map((alt) => (
                  <div key={alt.id} className="mb-2">
                    <p className="font-medium">{alt.name}</p>
                    <div className="flex justify-between text-sm">
                      <span>₹{alt.price}</span>
                      <span className="text-green-600">{alt.discount}% off</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Medical;