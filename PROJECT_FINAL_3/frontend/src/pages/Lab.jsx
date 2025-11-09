import React, { useState } from 'react';
import labTests from '../data/labTests';

const Lab = () => {
  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleBooking = (test) => {
    if (!localStorage.getItem('token')) {
      setNotification({
        show: true,
        message: 'Please login to book appointments'
      });
      return;
    }

    // Store lab appointment
    const labAppointments = JSON.parse(localStorage.getItem('labAppointments')) || [];
    const newAppointment = {
      id: Date.now(),
      testName: test.name,
      price: test.price,
      date: new Date().toLocaleDateString(),
      status: 'Pending'
    };
    labAppointments.push(newAppointment);
    localStorage.setItem('labAppointments', JSON.stringify(labAppointments));

    setNotification({
      show: true,
      message: 'Appointment booked successfully!'
    });

    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  const handleContactDoctor = () => {
    // For now, simple alert. Can be replaced with chat/email link.
    alert("Please contact your doctor for this specific test.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {notification.show && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md">
          {notification.message}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2 text-gray-800">Recommended Tests</h1>
      <p className="text-gray-600 mb-8">Book diagnostic tests and health checkups at discounted rates</p>

      {/* New Section for contacting doctor */}
      <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded shadow-sm flex justify-between items-center">
        <p className="text-yellow-800 font-medium">
          Can't find the test prescribed by your doctor?
        </p>
        <button
          onClick={handleContactDoctor}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
        >
          Contact Doctor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {labTests.map((test) => (
          <div key={test.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <img 
              src={test.image} 
              alt={test.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{test.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{test.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-bold text-gray-900">₹{test.price}</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  {test.discount}% off
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4 line-through">MRP: ₹{test.mrp}</p>
              <button
                onClick={() => handleBooking(test)}
                className="w-full bg-purple-900 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lab;
