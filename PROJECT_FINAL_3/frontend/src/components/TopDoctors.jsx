import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'>
      <h1 className='text-3xl font-medium'>Tests to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>
Browse through our wide range of reliable lab tests.
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {(doctors?.length > 0 ? doctors.slice(0, 9) : []).map((item, index) => {
          const imagePath = `/images/${item.image}`;

          // ✅ Dynamic AI Suggestion Text
         let suggestionText = "";
if (item.speciality === "Blood Test") suggestionText = "For general health and blood-related checks";
if (item.speciality === "Urine Test") suggestionText = "For kidney and urinary system analysis";
if (item.speciality === "Diabetes Test") suggestionText = "For monitoring blood sugar levels";
if (item.speciality === "Thyroid Test") suggestionText = "For thyroid function evaluation";
if (item.speciality === "Cardiac Test") suggestionText = "For heart and cardiac health assessment";
if (item.speciality === "COVID / Infection") suggestionText = "For viral and infection screening";

          return (
           <div
  key={item._id || index}
  onClick={() => {
    navigate(`/appointment/${item._id}`);
    scrollTo(0, 0);
  }}
  className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer 
             transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 
             shadow-md hover:shadow-xl bg-white'
>
  <img
    src={imagePath}
    alt={item.name}
    className='w-full h-[230px] object-cover transition-transform duration-500 hover:scale-110'
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = '/images/placeholder.png';
    }}
  />

  <div className='p-4'>
    <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
      <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></p>
      <p>{item.available ? 'Available' : 'Not Available'}</p>
    </div>
    <p className='text-[#262626] text-lg font-medium mt-2'>{item.name}</p>
    <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>

    {/* ✅ Highlighted Suggestion Text */}
    <p className='text-xs text-blue-600 font-semibold mt-1'>{suggestionText}</p>
  </div>
</div>

          );
        })}
      </div>

      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
