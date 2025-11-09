import React from 'react'
import { assets } from '../assets/assets'
import { FaBolt, FaUserMd, FaHeart } from 'react-icons/fa'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className="px-6 md:px-14">

      {/* Heading */}
      <div className="text-center text-3xl pt-10 text-[#707070] font-semibold">
        <p>
          ABOUT <span className="text-purple-900">US</span>
        </p>
      </div>

      {/* About Section */}
      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
        {/* Image with proper cover + white background */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full md:max-w-[420px] h-[420px] rounded-xl shadow-lg overflow-hidden bg-white flex items-center justify-center"
        >
          <img
            className="w-full h-full object-contain drop-shadow-xl"
            src={assets.about_image}
            alt="About"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 md:w-2/4 text-[15px] text-gray-600 leading-6"
        >
          <p>
            Welcome to our lab testing platform – your trusted partner in accurate and timely diagnostics.
          </p>
          <p>
            We focus on providing technology-driven solutions that allow you to book lab tests, access results online, and monitor your health with ease.
          </p>
          <b className="text-gray-800 text-lg">Our Vision</b>
          <div className="border-l-4 border-purple-900 pl-4 text-gray-600">
            <p>
              To make lab testing simple, reliable, and accessible to everyone. Our goal is to bridge the gap between patients and diagnostic services with transparency and trust.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center text-2xl font-semibold my-10">
        <p>WHY <span className="text-purple-900">CHOOSE US</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="border rounded-xl px-8 py-10 flex flex-col items-center text-center gap-4 bg-white shadow-md hover:bg-purple-900 hover:text-white transition-all duration-300 cursor-pointer"
        >
          <FaBolt className="text-3xl text-purple-700" />
          <b>ACCURACY</b>
          <p>Reliable lab testing with precise and validated results.</p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="border rounded-xl px-8 py-10 flex flex-col items-center text-center gap-4 bg-white shadow-md hover:bg-purple-900 hover:text-white transition-all duration-300 cursor-pointer"
        >
          <FaUserMd className="text-3xl text-purple-700" />
          <b>CONVENIENCE</b>
          <p>Book lab tests online and receive reports directly at your fingertips.</p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="border rounded-xl px-8 py-10 flex flex-col items-center text-center gap-4 bg-white shadow-md hover:bg-purple-900 hover:text-white transition-all duration-300 cursor-pointer"
        >
          <FaHeart className="text-3xl text-purple-700" />
          <b>INSIGHTS</b>
          <p>Get personalized health insights based on your lab test results.</p>
        </motion.div>
      </div>
    </div>
  )
}

export default About
