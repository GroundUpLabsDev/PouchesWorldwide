

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function EditForm() {
    return (
        <>
        <Header />
        <h1 className="text-center text-[#f0c02e] text-[70px] font-light font-['Poppins'] capitalize bg-black pt-8 pb-6">customize your account</h1>
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <form className="w-full max-w-md p-6">
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
              placeholder="Enter your name"
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
              placeholder="Enter your email"
              className="w-full input input-bordered bg-black text-white border border-[#27272A] placeholder-zinc-400 focus:outline-none"
              required
            />
          </div>
  
          {/* Mobile Number (Required) */}
          <div className="mb-8">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">
              Mobile Number <span className="text-yellow-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none mb-6"
              required
            />
          </div>
  
          {/* Company (Optional) */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">Company</label>
            <input
              type="text"
              placeholder="Enter your company name"
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none"
            />
          </div>
  
          {/* Website (Optional) */}
          <div className="mb-8">
            <label className="block mb-2 text-sm font-semibold text-zinc-400">Website</label>
            <input
              type="url"
              placeholder="Enter your website URL"
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none mb-6"
            />
          </div>
  
          {/* Shipping Address */}
          <div className="mt-2 space-y-4">
            <label className="block  text-sm font-semibold text-zinc-400">
              Shipping Address
            </label>
            <input
              type="text"
              placeholder="Street Address"
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="City/Town"
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="State/Province/Region"
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Zip Code"
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none"
            />
          </div>
          <div className="mb-8 mt-12">
            <label className="block mb-4 text-sm font-semibold text-zinc-400">
              Password <span className="text-yellow-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter your mobile number"
              className="w-full input input-bordered bg-black text-white border-[#27272A] placeholder-zinc-400 focus:outline-none mb-6"
              required
            />
          </div>
  
         
  
       {/* Agree to Terms and Signup Button */}
<div className="flex items-center justify-end mt-8 space-x-3 gap-[9px] inline-flex">
  {/* Signup Button */}
  <button
    type="submit"
    className="hover:bg-yellow-600 text-black py-2 px-4 rounded-md flex items-center justify-end space-x-2 h-[60px] w-[138px]"
    style={{ borderRadius: '5px', background: 'var(--gold-gradient, linear-gradient(113deg, #F5D061 -0.67%, #E6AF2E 99.33%))' }}
  >
    <span>Sign Up</span>
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
      <Footer />
      </>
      
    );
  }
  