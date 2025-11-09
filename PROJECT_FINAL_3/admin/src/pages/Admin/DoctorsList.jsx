import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const adminContext = useContext(AdminContext);

  // Destructure safely
  const {
    doctors = [],
    changeAvailability = () => {},
    aToken = null,
    getAllDoctors = () => {},
  } = adminContext || {};

  useEffect(() => {
    if (aToken && typeof getAllDoctors === 'function') {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Lab Test</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div
            className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group'
            key={item._id || index}
          >
            <img
              className='bg-[#EAEFFF] group-hover:bg-purple-900 transition-all duration-500 w-full h-32 object-cover'
              src={item.image ? `http://localhost:4000/images/${item.image}` : '/default-doc.png'}

              alt={item.name}
            />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
              <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
