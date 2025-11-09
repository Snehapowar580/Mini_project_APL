import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thanks ${formData.name}, your feedback has been submitted!`)
    setFormData({ name: '', email: '', message: '' })
    setShowForm(false)
  }

  return (
    <div className="px-6 md:px-14">

      {/* Heading */}
      <div className="text-center text-2xl pt-10 text-[#707070]">
        <p>CONTACT <span className="text-gray-700 font-semibold">US</span></p>
      </div>

      {/* Contact Info Section */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px] rounded-lg shadow-md"
          src={assets.contact_image}
          alt="Contact"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
          <p className="text-gray-500 leading-6">
            Flat No. 202, Sai Residency <br />
            Near XYZ Chowk, Pune, Maharashtra - 411001
          </p>
          <p className="text-gray-500 leading-6">
            Tel: +91 9876543210 <br />
            Email: sneha@example.com
          </p>
          <p className="font-semibold text-lg text-gray-600">CAREERS</p>
          <p className="text-gray-500">Learn more about our teams and job opportunities.</p>
          <button
            onClick={() => setShowForm(true)}
            className="border border-black px-8 py-3 text-sm rounded-md hover:bg-black hover:text-white transition-all duration-500"
          >
            Give Feedback
          </button>
        </div>
      </div>

      {/* Feedback Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Feedback Form</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
              />
              <textarea
                name="message"
                placeholder="Your Feedback"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
              ></textarea>
              <button
                type="submit"
                className="bg-purple-900 text-white py-2 rounded-md hover:bg-purple-700 transition"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact
