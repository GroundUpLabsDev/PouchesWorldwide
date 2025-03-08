"use client";

import { useRouter } from "next/navigation"; // ✅ Correct import for Next.js 13+
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, LogIn, User, Menu, LogOut } from "lucide-react";
import useCartStore from "@/store/cartStore";
import { getUserRole } from "@/app/utils/getUserRole";

const Header = () => {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  const [userRole, setUserRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token"); // Remove JWT token
      localStorage.removeItem("user"); // Remove user data
    }

    // Redirect to login page
    router.push("/auth/login");
  };

  useEffect(() => {
    setUserRole(getUserRole());
  }, []);

  return (
    <>
      {/* Sticky Header (Includes Warning Bar & Navbar) */}
      <div className="fixed top-0 left-0 w-full z-50">
  {/* Warning Banner */}
  <div className="bg-[#000000] text-white py-2 text-center text-sm">
    WARNING: This product contains nicotine. Nicotine is an addictive chemical
  </div>

  {/* Navbar */}
  <div className="bg-black shadow-md px-4 md:px-8 lg:px-8">
    <div className="navbar flex justify-center items-center gap-4 md:gap-[57px]">
      {/* Logo */}
      <div className="flex-1 max-w-xs">
        <Link href="/">
          <img src="/logo.png" alt="Zyn Logo" className="h-20 w-auto" />
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="block md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 text-white w-full max-w-xl h-[52px] p-2.5">
        <div className="relative w-full">
          <button className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search className="h-5 w-5 text-white" />
          </button>
          <input
            type="text"
            placeholder="Search Here..."
            className="input w-full pr-4 pl-10 bg-black text-white border-white focus:outline-white"
          />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex flex-none">
        <ul className="flex justify-center items-center space-x-5 text-white">
        <li>
      <Link href="/admin/Products" className="font-medium px-4 py-2 rounded-md hover:bg-gray-700">
        Products
      </Link>
    </li>
    <li>
      <Link href="/admin/OrderApprovals" className="font-medium px-4 py-2 rounded-md hover:bg-gray-700 capitalize">
      Order approval
      </Link>
    </li>
    <li>
      <Link href="/admin/Accounts" className="font-medium px-4 py-2 rounded-md hover:bg-gray-700 capitalize">
      account Approvals
      </Link>
    </li>
    <li>
      <Link href="/admin" className="font-medium px-4 py-2 rounded-md hover:bg-gray-700 capitalize">
        members
      </Link>
    </li>
    <li>
      <Link href="/admin/Orders" className="font-medium px-4 py-2 rounded-md hover:bg-gray-700 capitalize">
      orders
      </Link>
    </li>
        </ul>
      </div>

      {/* Login / User Role Button */}
      <div className="ml-4 hidden md:block">
        {userRole === "guest" ? (
          // Show Login Button for guests
          <Link href="/auth/login">
            <button
              className="btn btn-primary border-none text-black"
              style={{
                background: "radial-gradient(circle, #fae255 0%, #a06a0f 100%)",
              }}
            >
              <LogIn className="h-5 w-5 mr-2" />
              Login
            </button>
          </Link>
        ) : (

<div className="dropdown dropdown-hover">
  <div
    tabIndex={0}
    role="button"
    className="flex items-center space-x-2 text-white bg-gray-800 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-700"
  >
    <User className="h-5 w-5" />
    <span className="capitalize">{userRole}</span>
    <img
      className="w-[60px] h-[60px] rounded-full border-4 border-[#ffe047]"
      src="https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk"
    />
  </div>
  <ul
    tabIndex={0}
    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
  >
    {/* Show Profile tab only for retailer */}
    {userRole === "retailer" ? (
      <li>
        <Link href="/profile/edit">Profile</Link>
      </li>
    ) : (
      <>
        <li>
          <Link href="/profile/edit">Profile</Link>
        </li>
        <li>
          <Link
            href={
              userRole === "wholesaler" || userRole === "distributor"
                ? "/inventory"
                : userRole === "admin"
                ? "/admin"
                : "#"
            }
          >
            Inventory
          </Link>
        </li>
      </>
    )}


        
        {/* Logout Button */}
        <li>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-red-600 hover:bg-red-100 p-2 w-full rounded-md"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </li>
      </ul>
    </div>



        )}
      </div>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden flex flex-col items-center space-y-4 bg-black text-white py-4">
        <Link href="/" className="font-medium px-4 py-2 rounded-md hover:bg-gray-700">Products</Link>
        <Link href="/" className="font-medium px-4 py-2 rounded-md hover:bg-gray-700">Store</Link>
        <Link href="/cart" className="relative flex items-center px-4 py-2 rounded-md hover:bg-gray-700">
          <span>Cart</span>
          {cartQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartQuantity}
            </span>
          )}
        </Link>
        {userRole === "guest" ? (
          <Link href="/auth/login">
            <button
              className="btn btn-primary border-none text-black"
              style={{
                background: "radial-gradient(circle, #fae255 0%, #a06a0f 100%)",
              }}
            >
              <LogIn className="h-5 w-5 mr-2" />
              Login
            </button>
          </Link>
        ) : (
          <div className="flex items-center space-x-2 text-white bg-gray-800 px-4 py-2 rounded-md">
            <User className="h-5 w-5" />
            <span className="capitalize">{userRole}</span>
            <img className="w-[60px] h-[60px] rounded-full border-4 border-[#ffe047]" src={"https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk"} />
          </div>
        )}
      </div>
    )}
  </div>
</div>

{/* Padding to prevent content overlap */}
<div className="pt-[96px]" />


    </>
  );
};

export default Header;
