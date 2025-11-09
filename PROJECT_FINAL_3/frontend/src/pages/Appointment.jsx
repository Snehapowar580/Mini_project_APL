import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [appointmentType, setAppointmentType] = useState('Clinic Visit') // Default type

  const navigate = useNavigate()

  const fetchDocInfo = () => {
    const info = doctors.find((doc) => doc._id === docId)
    if (info) setDocInfo(info)
  }

  const getAvailableSlots = () => {
    const today = new Date()
    const allSlots = []

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date()
      currentDate.setDate(today.getDate() + i)

      const startTime = new Date(currentDate)
      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (i === 0) {
        const now = new Date()
        if (now >= endTime) continue

        const minutes = now.getMinutes()
        startTime.setHours(now.getHours())
        startTime.setMinutes(minutes > 30 ? 0 : 30)
        if (minutes > 30) startTime.setHours(now.getHours() + 1)
      } else {
        startTime.setHours(10, 0, 0, 0)
      }

      const slots = []
      const workingTime = new Date(startTime)

      while (workingTime < endTime) {
        const time = workingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const day = workingTime.getDate()
        const month = workingTime.getMonth() + 1
        const year = workingTime.getFullYear()
        const slotDate = `${day}_${month}_${year}`

        const isSlotAvailable =
          !docInfo?.slots_booked?.[slotDate] ||
          !docInfo.slots_booked[slotDate].includes(time)

        if (isSlotAvailable) {
          slots.push({ time, slotDate, datetime: new Date(workingTime) })
        }

        workingTime.setMinutes(workingTime.getMinutes() + 30)
      }

      if (slots.length > 0) allSlots.push(slots)
    }

    setDocSlots(allSlots)
    setSlotIndex(0)
    setSlotTime('')
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book Test')
      return navigate('/login')
    }
    if (!slotTime) {
      toast.warning('Please select a time slot')
      return
    }

    const selectedSlot = docSlots[slotIndex]?.find((slot) => slot.time === slotTime)
    if (!selectedSlot) {
      toast.error('Invalid slot selection')
      return
    }

    try {
      await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          docId,
          slotDate: selectedSlot.slotDate,
          slotTime: selectedSlot.time,
          appointmentType,
          onlinePayment: true, // ✅ Add this line to mark payment as PAID
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      toast.success('Test booked successfully!')
      navigate('/my-appointments')
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Booking failed')
    }
  }

  useEffect(() => { if (doctors.length > 0) fetchDocInfo() }, [doctors, docId])
  useEffect(() => { if (docInfo) getAvailableSlots() }, [docInfo])

  return docInfo ? (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-6 bg-white shadow-md rounded-lg p-6 sm:p-8">
        <div className="sm:w-72 w-full rounded-lg overflow-hidden">
          <img className="w-full h-full object-cover" src={`${backendUrl}/images/${docInfo.image}`} alt={docInfo.name} />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <p className="text-3xl font-semibold text-gray-700 flex items-center gap-2">
            {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="verified" />
          </p>
          <p className="text-gray-600">{docInfo.degree} - {docInfo.speciality}</p>
         {/* <p className="text-gray-600 font-medium">Experience: {docInfo.experience}</p>*/}
          <p className="text-gray-700 mt-3">{docInfo.about}</p>
          <p className="text-gray-600 mt-3">
            Fee: <span className="font-medium">{currencySymbol}{docInfo.fees}</span>
          </p>
          <p className="text-gray-600 mt-1">
            Location: <span className="font-medium">{docInfo.address}</span>
          </p>
        </div>
      </div>

      {/* Appointment Type Selection */}
      {/* Appointment Type Selection */}
<div className="mt-8 flex gap-4">
  {['On-Site Test', 'Phone Call'].map((type) => (  // Removed "Video Call"
    <button
      key={type}
      onClick={() => setAppointmentType(type)}
      className={`px-4 py-2 rounded-full border font-medium ${
        appointmentType === type
          ? 'bg-purple-900 text-white'
          : 'bg-white text-gray-700 border-gray-300'
      }`}
    >
      {type}
    </button>
  ))}
</div>


      {/* Booking Slots */}
      <div className="mt-6">
        <p className="font-medium text-gray-700 mb-2">Select Day</p>
        <div className="flex gap-3 overflow-x-scroll">
          {docSlots.map((daySlots, index) => {
            const firstSlot = daySlots[0]
            const dayName = daysOfWeek[firstSlot.datetime.getDay()]
            const dayDate = firstSlot.datetime.getDate()
            return (
              <div
                key={index}
                onClick={() => { setSlotIndex(index); setSlotTime('') }}
                className={`cursor-pointer px-4 py-3 rounded-lg text-center border ${
                  slotIndex === index ? 'bg-purple-900 text-white border-purple-900' : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                <p className="font-medium">{dayName}</p>
                <p>{dayDate}</p>
              </div>
            )
          })}
        </div>

        <p className="font-medium text-gray-700 mt-4 mb-2">Select Time</p>
        <div className="flex gap-3 overflow-x-scroll">
          {docSlots[slotIndex]?.map((slot, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(slot.time)}
              className={`cursor-pointer px-4 py-2 rounded-full border text-sm ${
                slot.time === slotTime ? 'bg-purple-900 text-white border-purple-900' : 'text-gray-600 border-gray-300'
              }`}
            >
              {slot.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className="mt-6 w-full sm:w-auto bg-purple-900 text-white py-3 px-6 rounded-full font-medium hover:bg-purple-800 transition"
        >
          Book
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null
}

export default Appointment
