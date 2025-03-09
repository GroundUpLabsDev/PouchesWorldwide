"use client";

import { useRouter } from 'next/navigation'; // Use this import for App Router
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignupForm from "../../../components/SignupForm";
import { ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

export default function SignUp() {
  // Get the query parameter 'role' from the URL using useRouter
  const router = useRouter();
  
  // Safe destructuring with a fallback
  const role = router.query?.role || ''; // Default to an empty string if `role` is undefined

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black -z-10"></div>
      <main className="bg-black w-full max-w-screen-2xl mx-auto overflow-x-hidden box-border">
        <Header />
        <h1 className="text-[72px] text-center font-light text-[#F1C02E] font-poppins capitalize mt-8">
          Ready to Begin? <span className="text-white">Sign Up </span>for <br /> A Better You with Pouches
        </h1>
        {/* Already Have an Account */}
        <p className="text-center mt-8 capitalize font-normal font-['Poppins'] text-white">
          Do you already have an account?{' '}
          <a href="/login" className="text-[#f5d061] underline">
            Login
          </a>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-black text-white">
          {/* Column 1 - Custom Height and Width */}
          <div className="h-[113px] w-[281px] md:w-[281px] flex justify-end ml-[16px] relative">
            {/* Outward Arrow Icon in Top-Right Corner */}
            {/* <div className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57" fill="none">
                <g opacity="0.5" clipPath="url(#clip0_378_13942)">
                  <path d="M14.25 14.25V19H34.6513L11.875 41.7763L15.2237 45.125L38 22.3487V42.75H42.75V14.25H14.25Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_378_13942">
                    <rect width="57" height="57" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div className="text-zinc-400">
              <h3 className="text-lg font-bold mb-2 text-left">Need Help ?</h3>
              <p className="leading-relaxed text-[16px] text-left">
                Torem ipsum dolor sit amet, 
                consectetur adipiscing elit. Nunc 
                vulputate libero et velit interdum, 
                ac aliquet odio mattis.
              </p>
            </div> */}
          </div>

          {/* Column 2 - Custom Height and Width */}
          <Suspense fallback={<div>Loading...</div>}>
            <SignupForm role={role} /> {/* Pass the role as a prop */}
          </Suspense>

          {/* Column 3 - Custom Height and Width 
          <div className="h-52 w-full md:w-56p-4">
            <div className="flex items-center">
              <button className="py-2 px-6 border border-[#27272A] text-yellow-500 bg-black rounded-md hover:bg-white hover:text-black transition flex items-center space-x-2">
                <span>For Login</span>
                <ArrowRight className="w-5 h-5 text-yellow-500" />
              </button>
            </div>
          </div> */}
        </div>

        <Footer />
      </main>
    </div>
  );
}
