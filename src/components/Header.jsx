"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, LogIn, User, Menu, LogOut } from "lucide-react";
import useCartStore from "@/store/cartStore";
import { getUserRole } from "@/app/utils/getUserRole";
import Preloader from "@/components/Preloader";

const Header = ({ setSearchQuery }) => {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [userRole, setUserRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    router.push("/auth/login");
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/shop?search=${searchInput}`);
    }
  };

  useEffect(() => {
    setUserRole(getUserRole());
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        
        <div className="bg-[#000000] text-white py-2 text-center text-sm">
          WARNING: This product contains nicotine. Nicotine is an addictive chemical
        </div>

        <div className="bg-black shadow-md px-4 md:px-8 lg:px-8">
        <div className="max-w-[1550px] mx-auto">
          <div className="navbar flex justify-between items-center gap-4 md:gap-[57px]">
            <div className="flex-1 max-w-xs">
              <Link href="/">
                <img src="/logo.png" alt="Zyn Logo" className="h-20 w-auto" />
              </Link>
            </div>

            <button
              className="block md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Conditionally Render Search, Home, Shop, Cart */}
            {userRole !== "distributor" && (
              <div className="hidden md:flex flex-1 text-white w-full max-w-xl h-[52px] p-2.5">
                <div className="relative w-full">
                  <button className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Search className="h-5 w-5 text-white" />
                  </button>
                  <form onSubmit={handleSearchSubmit} className="w-full">
                    <input
                      type="text"
                      placeholder="Search Here..."
                      value={searchInput}
                      onChange={handleSearchChange}
                      className="input w-full pr-4 pl-10 bg-black text-white border-white focus:outline-white"
                    />
                  </form>
                </div>
              </div>
            )}

            {/* Navigation Links (Home, Shop, Cart) */}
            {userRole !== "distributor" && (
              <div className="hidden md:flex flex-none">
                <ul className="flex justify-center items-center space-x-5 text-white">
                  <li>
                    <Link href="/" className="font-medium px-4 py-2 rounded-md hover:bg-gray-700">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop" className="font-medium px-4 py-2 rounded-md hover:bg-gray-700">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart" className="relative flex items-center px-4 py-2 rounded-md hover:bg-gray-700">
                      <span>Cart</span>
                      {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            <div className="ml-4 hidden md:block">
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
                    {userRole === "retailer" ? (
                      <li>
                        <Link href="/profile/edit">Profile</Link>
                        <Link href="/retailer/income">Income</Link>
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
                            Dashboard
                          </Link>
                        </li>
                      </>
                    )}
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

          {isMenuOpen && (
            <div className="md:hidden flex flex-col items-center space-y-4 bg-black text-white py-4">
              <Link href="/" className="font-medium px-4 py-2 rounded-md hover:bg-gray-700">
                Products
              </Link>
              <Link href="/" className="font-medium px-4 py-2 rounded-md hover:bg-gray-700">
                Store
              </Link>
              <Link href="/cart" className="relative flex items-center px-4 py-2 rounded-md hover:bg-gray-700">
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
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
                  <img className="w-[60px] h-[60px] rounded-full border-4 border-[#ffe047]" src="https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk" />
                </div>
              )}
            </div>
          )}
        </div>
        </div>
      </div>

      <div className="pt-[120px]" />
    </>
  );
};

export default Header; 