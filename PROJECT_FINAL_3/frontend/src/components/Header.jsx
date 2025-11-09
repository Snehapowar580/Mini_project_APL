import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col md:flex-row rounded-lg overflow-hidden my-20 md:mx-10 border-2 border-purple-200">

      {/* --------- Left Side (White Background) --------- */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center py-12 px-8 md:px-14">
        <p className="text-3xl md:text-4xl lg:text-5xl text-purple-900 font-extrabold leading-tight">
          Book Your <span className="text-purple-700">Lab Tests Online,</span> <br /> Hassle-Free
        </p>

        <p className="mt-4 text-gray-600 text-sm md:text-base">
Browse our list of available lab tests and schedule your tests conveniently from home.

        </p>

        <button
          onClick={() => { navigate('/login'); scrollTo(0, 0) }}
          className="border-2 border-purple-900 text-purple-900 bg-white text-sm sm:text-base px-8 py-3 rounded-full mt-6 hover:bg-purple-900 hover:text-white transition-all"
        >
          Schedule Slot
        </button>

        <span className="mt-4 text-sm text-gray-500">
          Trusted by <b>10,000+</b> patients
        </span>
      </div>

      {/* --------- Right Side (Purple Background + Image) --------- */}
      <div className="w-full md:w-1/2 bg-purple-900 flex items-center justify-center ">
        <img
          className="w-full max-w-sm md:max-w-md"
          src={assets.header_img}
          alt="header doctors"
        />
      </div>
    </div>
  )
}

export default Header
