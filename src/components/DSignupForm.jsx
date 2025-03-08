'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SignupForm() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role'); // Get the 'role' query parameter

  // State to hold form data
  const [formData, setFormData] = useState({
    username: '', // Text
    email: '', // Email
    password: '', // Password
    company: '', // Text
    website: '', // Text
    address: '', // Text
    referType: '', // Text
    referEmail: '', // Email
    mobileNumber: '', // Text
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the payload for the API
      const payload = {
        data: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          company: formData.company,
          website: formData.website,
          address: formData.address,
          referType: formData.referType,
          referEmail: formData.referEmail,
          mobileNumber: formData.mobileNumber,
        },
      };

      // Send the data to the API
      const response = await fetch('http://146.190.245.42:1337/api/distributors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        // Optionally reset the form after success
        setFormData({
          username: '',
          email: '',
          password: '',
          company: '',
          website: '',
          address: '',
          referType: '',
          referEmail: '',
          mobileNumber: '',
        });
      } else {
        // Handle errors from the API
        alert('Error: ' + (result.error?.message || 'Registration failed'));
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <form className="w-full max-w-md p-6" onSubmit={handleSubmit}>
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center space-y-4">
          <div
            className="w-24 h-24 rounded-full border-2 border-[#27272A] flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/profile_photo.png')" }}
          >
            <label className="cursor-pointer w-full h-full flex items-center justify-center">
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* Username (Required) */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-zinc-400">
            Username <span className="text-yellow-500">*</span>
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none"
            required
          />
        </div>

        {/* Email (Required) */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-zinc-400">
            Email <span className="text-yellow-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none"
            required
          />
        </div>

        {/* Password (Required) */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-zinc-400">
            Password <span className="text-yellow-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none"
            required
          />
        </div>

        {/* Company */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-zinc-400">
            Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter your company name"
            className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none"
          />
        </div>

        {/* Website */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-zinc-400">
            Website
          </label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter your website"
            className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-zinc-400">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none"
          />
        </div>

        {/* Mobile Number (Required) */}
        <div className="mb-8">
          <label className="block mb-2 text-sm font-semibold text-zinc-400">
            Mobile Number <span className="text-yellow-500">*</span>
          </label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none mb-6"
            required
          />
        </div>

        {/* Refer Type */}
        <div className="mt-12">
          <label className="block mb-2 text-sm font-semibold text-zinc-400">
            Refer Type
          </label>
          <input
            type="text"
            name="referType"
            value={formData.referType}
            onChange={handleChange}
            placeholder="Friend"
            className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none mb-4"
          />
        </div>

        {/* Refer Email */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-zinc-400">
            Refer Email
          </label>
          <input
            type="email"
            name="referEmail"
            value={formData.referEmail}
            onChange={handleChange}
            placeholder="Enter refer email"
            className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none"
          />
        </div>

        {/* Signup Button */}
        <div className="flex items-center justify-end mt-8 space-x-3">
          <button
            type="submit"
            className="hover:bg-yellow-600 text-black py-2 px-4 rounded-md flex items-center justify-center space-x-2 h-[60px] w-[210px]"
            style={{
              borderRadius: '5px',
              background:
                'var(--gold-gradient, linear-gradient(113deg, #F5D061 -0.67%, #E6AF2E 99.33%))',
            }}
          >
            <span>Create Distributor</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}