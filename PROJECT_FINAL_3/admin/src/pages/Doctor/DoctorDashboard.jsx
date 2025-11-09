import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        if (!dToken) {
          setError('Token is missing. Please log in again.')
          return
        }

        await getDashData()
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  // Conditional render states
  if (loading) return <div className="text-center mt-10 text-gray-500">Loading Dashboard...</div>
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>
  if (!dashData) return <div className="text-center mt-10 text-gray-500">No dashboard data available.</div>

  return (
    <div className="m-5">
      {/* Stats Summary Cards */}
      <div className="flex flex-wrap gap-3">
        <Card icon={assets.earning_icon} title="Earnings" value={`${currency} ${dashData.earnings || 0}`} />
        <Card icon={assets.appointments_icon} title="Appointments" value={dashData.appointments || 0} />
        <Card icon={assets.patients_icon} title="Patients" value={dashData.patients || 0} />
      </div>

      {/* Latest Bookings */}
      <div className="bg-white mt-10 rounded border">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b">
          <img src={assets.list_icon} alt="list" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-4">
          {dashData.latestAppointments?.length > 0 ? (
            dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div
                key={item._id || index}
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100 border-t"
              >
                <img
                  className="rounded-full w-10 h-10 object-cover"
                  src={item.userData?.image || assets.default_user}
                  alt="user"
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.userData?.name || 'Unknown'}</p>
                  <p className="text-gray-600">Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">Completed</p>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-6 cursor-pointer"
                      src={assets.cancel_icon}
                      alt="cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-6 cursor-pointer"
                      src={assets.tick_icon}
                      alt="complete"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="px-6 py-4 text-gray-400 text-sm">No recent bookings found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

const Card = ({ icon, title, value }) => (
  <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-transform">
    <img className="w-14" src={icon} alt={title} />
    <div>
      <p className="text-xl font-semibold text-gray-600">{value}</p>
      <p className="text-gray-400">{title}</p>
    </div>
  </div>
)

export default DoctorDashboard
