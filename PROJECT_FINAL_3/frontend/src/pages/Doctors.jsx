import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
// at the top of Doctors.jsx
import { labImages } from '../assets/assets';


const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors, patient } = useContext(AppContext);

  // Scoring function (optional)
  const aiScore = (doc) => {
    return doc.rating || 4.5;
  };

  // Generate tags based on speciality
  const generateTags = (doc) => {
    const tags = [];
    if (doc.speciality === 'Blood Test') tags.push('CBC', 'Lipid Profile');
    if (doc.speciality === 'Urine Test') tags.push('Routine Urine', 'Protein Check');
    if (doc.speciality === 'Diabetes Test') tags.push('Fasting Sugar', 'HbA1c');
    if (doc.speciality === 'Thyroid Test') tags.push('T3, T4', 'TSH');
    if (doc.speciality === 'Cardiac Test') tags.push('ECG', 'TMT');
    if (doc.speciality === 'COVID / Infection') tags.push('RT-PCR', 'Rapid Antigen');
    return tags;
  };

  // Filter and sort doctors
  const applyFilter = () => {
    let docs = speciality
      ? doctors.filter(doc => doc.speciality === speciality)
      : [...doctors];
    docs.sort((a, b) => aiScore(b) - aiScore(a));
    setFilterDoc(docs);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, patient]);

  return (
    <div className="px-4 sm:px-8">
      {speciality && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md mb-5 text-sm shadow-sm">
          Showing Tests for: <span className="font-semibold">{speciality}</span>
        </div>
      )}

      <p className="text-gray-600">Browse through the Lab Category.</p>

      <div className="mt-5 flex flex-col sm:flex-row gap-5">

        {/* Sidebar */}
        <div className={`sm:w-64 ${showFilter ? 'flex flex-wrap gap-2' : 'hidden sm:flex'} flex-col space-y-3 sticky top-20`}>
          {[
            { name: 'Blood Test', icon: '🩸', color: 'bg-red-100', tag: 'Common Test' },
            { name: 'Urine Test', icon: '🧪', color: 'bg-blue-100', tag: 'Routine Test' },
            { name: 'Diabetes Test', icon: '🍬', color: 'bg-yellow-100', tag: 'Sugar Check' },
            { name: 'Thyroid Test', icon: '🧬', color: 'bg-purple-100', tag: 'Hormone Check' },
            { name: 'Cardiac Test', icon: '❤️', color: 'bg-pink-100', tag: 'Heart Health' },
            { name: 'COVID / Infection', icon: '🦠', color: 'bg-green-100', tag: 'Infection Check' },
          ].map(item => (
            <div
              key={item.name}
              onClick={() => navigate(speciality === item.name ? '/doctors' : `/doctors/${item.name}`)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer shadow hover:shadow-lg transition-all ${speciality === item.name ? 'border-2 border-blue-500' : 'border border-gray-300'} ${item.color}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <p className={`font-medium text-sm ${speciality === item.name ? 'text-black' : 'text-gray-700'}`}>{item.name}</p>
              </div>
              <span className="text-xs bg-white px-2 py-0.5 rounded-full shadow-sm">{item.tag}</span>
            </div>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filterDoc.map(item => (
          <div
  key={item._id}
  onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
  className="border border-gray-200 rounded-2xl overflow-hidden cursor-pointer 
             hover:-translate-y-1 hover:scale-105 transition-all duration-300 
             shadow-lg bg-white group"
>
  <img
    className="w-full h-40 md:h-44 object-cover bg-[#EAEFFF] transition-transform duration-500 group-hover:scale-110"
    src={item.image}
    alt={item.name}
    onError={(e) => { 
      e.target.onerror = null; 
      const index = doctors.findIndex(doc => doc._id === item._id);
      e.target.src = labImages[index % labImages.length]; // fallback unique per card
    }}
  />

  <div className="p-4">
    <div className={`flex items-center gap-2 text-sm mb-1 ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
      <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></span>
      <p>{item.available ? 'Available' : 'Not Available'}</p>
    </div>

    <p className="text-[#262626] text-lg font-semibold truncate">{item.name}</p>
    <p className="text-[#5C5C5C] text-sm mb-2 truncate">{item.speciality}</p>

    <div className="flex flex-wrap gap-1 mb-2">
      {generateTags(item).map((tag, idx) => (
        <span key={idx} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">{tag}</span>
      ))}
    </div>

    <div className="text-sm text-gray-600 space-y-1">
      <p>💰 Fees: ₹{item.fees || 'N/A'}</p>
    </div>

    <button className="mt-3 w-full bg-purple-800 text-white text-sm py-2 rounded-md opacity-0 group-hover:opacity-100 transition-all">
      Book
    </button>
  </div>
</div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
