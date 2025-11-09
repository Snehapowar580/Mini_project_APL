import React, { useEffect, useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (aToken && appointments.length === 0) {
      const fetchAppointments = async () => {
        setIsLoading(true);
        try {
          await getAllAppointments();
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAppointments();
    } else {
      setIsLoading(false);
    }
  }, [aToken, appointments, getAllAppointments]);

  useEffect(() => {
    console.log('Appointments inside component:', appointments);
  }, [appointments]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      {isLoading ? (
        <div className="text-center text-gray-500">Loading slots...</div>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-500">No slots found.</p>
      ) : (
        <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
          {/* Header without Doctor */}
          <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_1fr] py-3 px-6 border-b'>
            <p>#</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>

          {/* Rows */}
          {appointments.map((item, index) => (
            <div
              key={index}
              className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
              <p className='max-sm:hidden'>{index + 1}</p>

              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p>{currency}{item.amount}</p>

              {item.cancelled ? (
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-medium'>Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className='w-10 cursor-pointer'
                  src={assets.cancel_icon}
                  alt="cancel"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
