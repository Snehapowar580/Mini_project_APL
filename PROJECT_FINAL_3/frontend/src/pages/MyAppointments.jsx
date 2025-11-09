import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import phonepe_logo from '../assets/phonepe_logo.png';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [labAppointments, setLabAppointments] = useState([]);
  const [activePayId, setActivePayId] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return '';
    const dateArray = slotDate.split('_');
    if (dateArray.length !== 3) return slotDate;
    const day = dateArray[0];
    const monthIndex = Number(dateArray[1]) - 1;
    const year = dateArray[2];
    return `${day} ${months[monthIndex]} ${year}`;
  };

  const getUserAppointments = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data.appointments.reverse());

      const savedLabAppointments = JSON.parse(localStorage.getItem('labAppointments')) || [];
      setLabAppointments(savedLabAppointments);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cancelAppointment = async (appointmentId, type = 'doctor') => {
    if (type === 'doctor') {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/cancel-appointment`,
          { appointmentId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data.success) {
          toast.success(data.message);
          getUserAppointments();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    } else if (type === 'lab') {
      const updatedLabAppointments = labAppointments.filter(app => app._id !== appointmentId);
      setLabAppointments(updatedLabAppointments);
      localStorage.setItem('labAppointments', JSON.stringify(updatedLabAppointments));
      toast.success("Lab appointment cancelled successfully.");
    }
  };

  const handlePhonePePayment = async (appointmentId) => {
    setLoadingPayment(true);
    try {
      const appointment = appointments.find(app => app._id === appointmentId) || labAppointments.find(lab => lab._id === appointmentId);
      if (!appointment) {
        toast.error("Invalid appointment selected for payment.");
        setLoadingPayment(false);
        return;
      }

      const paymentPayload = {
        user_id: token,
        price: Number(appointment.amount ?? appointment.price ?? 100),
        phone: '0000000000',
        name: appointment.docData?.name || appointment.testName || "Appointment",
        redirectUrl: 'http://localhost:5173/MyAppointments',
      };

      const response = await axios.post(`${backendUrl}/api/payment/initiate`, paymentPayload);

      if (response.data?.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      } else {
        toast.error("Failed to initiate payment.");
      }
    } catch (error) {
      console.error('Payment Error:', error.response?.data || error.message);
      toast.error("Error initiating payment.");
    } finally {
      setLoadingPayment(false);
      setActivePayId(null);
    }
  };

  // Fixed: Show toast for both doctor and lab payments
  const handleCashPayment = (appointmentId, type = 'lab') => {
    if (type === 'lab') {
      const updatedAppointments = labAppointments.map(app =>
        app._id === appointmentId ? { ...app, status: 'Cash Payment Done' } : app
      );
      setLabAppointments(updatedAppointments);
      localStorage.setItem('labAppointments', JSON.stringify(updatedAppointments));
    } else if (type === 'doctor') {
      const updatedAppointments = appointments.map(app =>
        app._id === appointmentId ? { ...app, status: 'Cash Payment Done' } : app
      );
      setAppointments(updatedAppointments);
    }
    toast.success('Cash payment marked successfully!');
    setActivePayId(null);
  };

  const getDoctorImage = (imageName) => {
    if (!imageName) return "/default-doctor.png";
    if (imageName.startsWith("http")) return imageName;
    return `/images/${imageName}`;
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    } else {
      navigate('/login');
    }
  }, [token]);

  const validAppointments = appointments.filter(item => item.docData);

  return (
    <div className='p-4'>
      <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My Bookings</p>

      <div className='mt-4 flex flex-col gap-6'>
        {validAppointments.map((item) => {
          const isActive = !item.cancelled && !item.isCompleted;
          return (
            <div key={item._id} className='flex flex-col sm:flex-row sm:gap-6 border-b pb-4'>
              <img
                className='w-36 h-36 object-cover bg-[#EAEFFF] rounded'
                src={getDoctorImage(item.docData?.image)}
                alt="Doctor"
              />
              <div className='flex-1 text-sm text-[#5E5E5E] mt-2 sm:mt-0'>
                <p className='text-[#262626] text-base font-semibold'>{item.docData?.name || "Unknown Doctor"}</p>
                <p>{item.docData?.speciality}</p>
                <p className='text-[#464646] font-medium mt-1'>Address:</p>
                <p>{item.docData?.address?.line1}</p>
                <p>{item.docData?.address?.line2}</p>
                <p className='mt-1'>
                  <span className='font-medium text-[#3C3C3C]'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              <div className='flex flex-col gap-2 text-sm text-center mt-4 sm:mt-0 justify-center'>
                {isActive && (
                  <>
                    {activePayId !== item._id ? (
                      <button
                        onClick={() => setActivePayId(item._id)}
                        className='text-[#696969] min-w-40 py-2 border rounded hover:bg-purple-900 hover:text-white transition-all'
                      >
                        Pay Online
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handlePhonePePayment(item._id)}
                          className='min-w-40 py-2 border rounded flex justify-center items-center hover:bg-gray-100'
                          disabled={loadingPayment}
                        >
                           <img src={phonepe_logo} alt="PhonePe" className="w-20 h-6 object-contain" />
                        </button>
                        <button
                          onClick={() => handleCashPayment(item._id, 'doctor')}
                          className='text-green-600 w-full py-2 border rounded mt-2 hover:bg-green-50'
                        >
                          Pay by Cash
                        </button>
                        <button
                          onClick={() => setActivePayId(null)}
                          className='text-red-500 py-1'
                        >
                          Hide Payment Options
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => cancelAppointment(item._id, 'doctor')}
                      className='text-[#D9534F] py-2 px-4 border rounded mt-2'
                    >
                      Cancel Booking
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {labAppointments.length > 0 && (
          <p className="mt-8 mb-3 text-lg font-medium text-gray-800 border-b">My Lab Bookings</p>
        )}

        {labAppointments.map((lab) => {
          const isActive = !lab.cancelled && !lab.isCompleted;
          return (
            <div key={lab._id} className='border-b pb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center'>
              <div className='flex-1'>
                <p className='text-base font-semibold text-[#2B2B2B]'>{lab.testName}</p>
                <p className='text-sm text-[#5E5E5E]'>{lab.labName}</p>
                <p className='text-sm mt-1'>
                  <span className='font-medium text-[#3C3C3C]'>Date & Time:</span> {lab.date} | {lab.time}
                </p>
                <p className='text-sm mt-1'>
                  <span className='font-medium text-[#3C3C3C]'>Status:</span> {lab.status || 'Pending'}
                </p>
                <p className='text-sm mt-1'>
                  <span className='font-medium text-[#3C3C3C]'>Price:</span> ₹{lab.price || 'N/A'}
                </p>
              </div>

              {isActive && (
                <div className='flex flex-col gap-2 mt-4 sm:mt-0 text-center sm:text-right sm:w-48'>
                  {activePayId !== lab._id ? (
                    <button
                      onClick={() => setActivePayId(lab._id)}
                      className='text-[#696969] w-full py-2 border rounded hover:bg-purple-900 hover:text-white transition-all'
                    >
                      Pay Online
                    </button>
                  ) : (
                    <>
                      <button
  onClick={() => handlePhonePePayment(item._id)}
  className='min-w-40 py-2 border rounded flex justify-center items-center hover:bg-gray-100'
  disabled={loadingPayment}
>
  <img src={phonepe_logo.png} alt="PhonePe" className="w-20 h-8 object-contain" />
</button>

                      <button
                        onClick={() => handleCashPayment(lab._id, 'lab')}
                        className='text-green-600 w-full py-2 border rounded mt-2 hover:bg-green-50'
                      >
                        Pay by Cash
                      </button>
                      <button
                        onClick={() => setActivePayId(null)}
                        className='text-red-500 py-1'
                      >
                        Hide Payment Options
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => cancelAppointment(lab._id, 'lab')}
                    className='text-[#D9534F] py-2 px-4 border rounded mt-2'
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;
