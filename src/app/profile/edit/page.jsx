"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EditForm() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    company: "",
    website: "",
    address: "",
    city: "",
    state: "",
    password: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState("/profile_photo.png");

  // Load user data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle profile image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

 // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  if (!token || !user.id) {
    alert("User not authenticated or missing ID");
    return;
  }

  try {
    const response = await fetch(`https://pouchesworldwide.com/strapi/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        mobileNumber: user.mobileNumber,
        company: user.company,
        website: user.website,
        address: user.address,
        city: user.city,
        state: user.state,
        password: user.password,
      }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Profile updated successfully!");
    } else {
      alert("Failed to update profile");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};


  return (
    <>
      <Header />
      <h1 className="text-center text-[#f0c02e] text-[70px] font-light font-['Poppins'] capitalize bg-black pt-8 pb-6">
        Customize Your Account
      </h1>
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <form className="w-full max-w-md p-6" onSubmit={handleSubmit}>
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div
              className="w-24 h-24 rounded-full border-2 border-[#27272A] flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${profileImage})` }}
            >
              <label className="cursor-pointer w-full h-full flex items-center justify-center">
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">Name</label>
            <input
              type="text"
              name="name"
              value={user.username}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400"
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={user.mobileNumber}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400"
              required
            />
          </div>

          {/* Company */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">Company</label>
            <input
              type="text"
              name="company"
              value={user.company}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400"
            />
          </div>

          {/* Website */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">Website</label>
            <input
              type="text"
              name="website"
              value={user.website}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-zinc-400">Address</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400"
            />
          </div>

          {/* City */}
          <div className="mb-4">
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400"
              placeholder="City"
            />
          </div>

          {/* State */}
          <div className="mb-4">
            <input
              type="text"
              name="state"
              value={user.state}
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400"
              placeholder="State"
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <label className="block mb-4 text-sm font-semibold text-zinc-400">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400"
              required
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="hover:bg-yellow-600 text-black py-2 px-4 rounded-md h-[60px] w-[138px]"
            style={{ borderRadius: "5px", background: "linear-gradient(113deg, #F5D061 -0.67%, #E6AF2E 99.33%)" }}
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
