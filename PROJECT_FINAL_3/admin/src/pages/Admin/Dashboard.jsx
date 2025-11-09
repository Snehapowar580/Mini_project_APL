import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData(); // Only fetch data if the token is available
    }
  }, [aToken, getDashData]);

  if (!dashData) {
    return <div className="p-10 text-center text-gray-500">Loading Dashboard...</div>;
  }

  return (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">
        <StatCard icon={assets.doctor_icon} count={dashData.doctors} label="Tests" />
        <StatCard icon={assets.appointments_icon} count={dashData.appointments} label="Appointments" />
        <StatCard icon={assets.patients_icon} count={dashData.patients} label="Patients" />
      </div>

      <div className="bg-white mt-10 rounded border">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b">
          <img src={assets.list_icon} alt="List Icon" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-2">
          {dashData.latestAppointments?.length > 0 ? (
            dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100 transition">
                <img className="rounded-full w-10 h-10 object-cover" src={item?.docData?.image} alt={item?.docData?.name || 'Doctor'} />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item?.docData?.name || 'Unknown Doctor'}</p>
                  <p className="text-gray-600">Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">Completed</p>
                ) : (
                  <img onClick={() => cancelAppointment(item._id)} className="w-6 cursor-pointer" src={assets.cancel_icon} alt="Cancel" />
                )}
              </div>
            ))
          ) : (
            <p className="px-6 py-4 text-gray-400 text-sm">No recent bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, count, label }) => (
  <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
    <img className="w-14" src={icon} alt={`${label} icon`} />
    <div>
      <p className="text-xl font-semibold text-gray-600">{count}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  </div>
);

export default Dashboard;
