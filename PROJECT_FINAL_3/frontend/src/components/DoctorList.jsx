import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctors }) => {
  const navigate = useNavigate();

  if (!doctors || doctors.length === 0) {
    return <p className="text-gray-500">No doctors available.</p>;
  }

  return (
    <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
      {doctors.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            navigate(`/appointment/${item._id}`);
            scrollTo(0, 0);
          }}
          className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
        >
          <img className='bg-[#EAEFFF]' src={item.image} alt={item.name} />
          <div className='p-4'>
            <div
              className={`flex items-center gap-2 text-sm text-center ${
                item.available ? 'text-green-500' : 'text-gray-500'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  item.available ? 'bg-green-500' : 'bg-gray-500'
                }`}
              ></span>
              <span>{item.available ? 'Available' : 'Not Available'}</span>
            </div>
            <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
            <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
