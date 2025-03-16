"use client";

import { useRouter } from "next/navigation"; // Use this import for App Router
import Header from "@/components/AdminUi/Header";
import Footer from "@/components/Footer";
import SignupForm from "@/components/DSignupForm";
import { ArrowRight } from "lucide-react";

export default function SignUp() {
  // Get the query parameter 'role' from the URL using useRouter
  const router = useRouter();

  // Safe destructuring with a fallback
  const role = router.query?.role || ""; // Default to an empty string if `role` is undefined

  return (
    <main className="bg-black">
      <h1 className="text-[72px] text-center font-light text-[#F1C02E] font-poppins capitalize">
        Create Distributors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-black text-white">
        {/* Column 1 - Custom Height and Width */}
        <div className="h-[113px] w-[281px] md:w-[281px] flex justify-end ml-[16px] relative">
          {/* Outward Arrow Icon in Top-Right Corner */}

          <div className="text-zinc-400"></div>
        </div>
        {/* Column 2 - Custom Height and Width */}
        <SignupForm role={role} /> {/* Pass the role as a prop */}
        {/* Column 3 - Custom Height and Width */}
        <div className="h-52 w-full md:w-56p-4">
          <div className="flex items-center"></div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
