'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role'); // Get role from URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://pouchesworldwide.com/strapi/api/auth/local/register',
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      const userId = response.data.user.id;

      // Redirect to complete-profile page with userId & role
      router.push(`/auth/complete-profile?userId=${userId}&role=${role}`);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Signup failed! ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      
      <form className="w-full max-w-xl p-6" onSubmit={handleSubmit}>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
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

        {/* Name (Required) */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-zinc-400">
            Name <span className="text-yellow-500">*</span>
          </label>
          <input
  type="text"
  name="username"
  value={formData.username}
  onChange={handleChange}
  placeholder="Enter your name"
  className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none focus:border-[#fae255]"
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
            className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none focus:border-[#fae255]"
            required
          />
        </div>

        {/* Mobile Number (Required) */}
        <div className="mb-8">
          <label className="block mb-2 text-sm font-semibold text-zinc-400">
          Password <span className="text-yellow-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none focus:border-[#fae255] mb-6"
            required
          />
        </div>
       
        {/* Agree to Terms and Signup Button */}
        <div className="flex items-center justify-between mt-8 space-x-3">
          {/* Agree to Terms */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="terms"
              className="checkbox checkbox-black bg-black border-[#27272A]"
              required
            />
            <label htmlFor="terms" className="text-sm">
              Agree to Terms & Conditions
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="hover:bg-yellow-600 text-black py-2 px-4 rounded-md flex items-center justify-center space-x-2 h-[60px] w-[138px]"
            style={{
              borderRadius: '5px',
              background:
                'var(--gold-gradient, linear-gradient(113deg, #F5D061 -0.67%, #E6AF2E 99.33%))',
            }}
          >
            <span>{loading ? 'Signing up...' : 'Sign Up'}</span>
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