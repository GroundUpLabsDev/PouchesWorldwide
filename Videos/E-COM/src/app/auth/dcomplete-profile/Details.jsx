'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Header from '@/components/Header';

export default function CompleteProfile() {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    address: '',
    city: '',
    state: '',
    mobile_number: '', 
    referEmail: '',
    referType: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId'); // Get userId from URL
  const role = searchParams.get('role'); // Get role from URL (wholesaler or retailer)

  // Set role and confirmation based on role
  let roleId = 4; // Default to retailer (role 4)
  let isConfirmed = true;


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
      // Update user profile + role + confirmation status
      await axios.put(`https://pouchesworldwide.com/strapi/api/users/${userId}`, {
        ...formData,
        role: roleId, // Set role based on role
        confirmed: true, // Set confirmed flag
        urole: role
      });

      alert('Profile updated successfully! ✅');

      // Redirect to login page
      router.push('/admin');
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
      setError('Profile update failed! ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <form className="w-full max-w-xl p-6" onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold mb-6">Complete Your Profile</h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">
              Company <span className="text-yellow-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none focus:border-[#fae255]"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">
              Website <span className="text-yellow-500">*</span>
            </label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none focus:border-[#fae255]"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">
              Address <span className="text-yellow-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none focus:border-[#fae255]"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">
              City <span className="text-yellow-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none focus:border-[#fae255]"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">
              Mobile Number <span className="text-yellow-500">*</span>
            </label>
            <input
              type="text"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none focus:border-[#fae255]"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">
              Referral Type<span className="text-yellow-500"></span>
            </label>
            <input
              type="text"
              name="referType"
              value={formData.referType}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none focus:border-[#fae255]"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">
            Referral Email<span className="text-yellow-500"></span>
            </label>
            <input
              type="email"
              name="referEmail"
              value={formData.referEmail}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none focus:border-[#fae255]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 text-black py-2 px-4 rounded-md"
          >
            {loading ? 'Saving...' : 'Finish'}
          </button>
        </form>
      </div>
    </>
  );
}
