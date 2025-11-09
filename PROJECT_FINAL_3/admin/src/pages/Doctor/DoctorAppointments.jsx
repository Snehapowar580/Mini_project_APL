import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.log('Error fetching appointments:', error);
      });
  }, []);

  return (
    <div>
      <h1>Appointmens</h1>
      <table style={{ borderCollapse: 'separate', borderSpacing: '100px' }}>
        <thead>
          <tr>
            <th>Slot Date</th>
            <th>Slot Time</th>
            <th>Amount</th>
            <th>Cancelled</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.slotDate}</td>
                <td>{appointment.slotTime}</td>
                <td>{appointment.amount}</td>
                <td>{appointment.cancelled ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No appointments available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
