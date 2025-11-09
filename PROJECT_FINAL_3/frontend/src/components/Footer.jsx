import React, { useState } from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.')
      return
    }
    alert(`Subscribed successfully with ${email}`)
    setEmail('')
  }

  return (
    <footer className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 text-gray-800 px-6 md:px-14 pt-16 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-300 pb-12">

        {/* Brand & Social */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Your Health, Simplified</h2>
          <p className="text-gray-600 mb-6 max-w-md leading-6">
            Book Your Tests, connect with experts, and access healthcare services seamlessly from anywhere.
          </p>
          <div className="flex gap-4 text-gray-600 text-xl">
            <FaFacebookF className="hover:text-blue-600 cursor-pointer transition" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />
            <FaLinkedinIn className="hover:text-blue-800 cursor-pointer transition" />
            <FaTwitter className="hover:text-sky-500 cursor-pointer transition" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">About Us</li>
            <li className="hover:text-black cursor-pointer">Services</li>
            <li className="hover:text-black cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
          <p className="text-sm text-gray-600 mb-3">Subscribe to receive news and updates directly to your inbox.</p>
          <div className="flex flex-col gap-3 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
            />
            <button
              onClick={handleSubscribe}
              className="w-full bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} <strong>Created by @snehapowar</strong>
      </div>
    </footer>
  )
}

export default Footer
