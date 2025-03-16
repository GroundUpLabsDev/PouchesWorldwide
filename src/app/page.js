"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import Image from "next/image";
import Link from "next/link";
import PrimaryList from "@/components/Primarylist";
import ProductCard from "@/components/ProductCard";
import Feedback from "@/components/Feedback";
import FAQ from "@/components/FAQ";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import BlackBanner from "@/components/BlackBanner";
import Pagination from "@/components/Pagination";
import { fetchProducts } from "@/app/utils/fetchProducts"; // Import the fetchProducts function
import Preloader from "@/components/Preloader"; // Import Preloader
import { getUserRole } from "@/app/utils/getUserRole"; // Import getUserRole function

export default function Home() {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // Loading state
  const [userRole, setUserRole] = useState(null); // State to store userRole
  const router = useRouter(); // Initialize useRouter for redirection

  useEffect(() => {
    // This will only run after the component is mounted
    const role = getUserRole(); // Get the user role
    setUserRole(role);

    if (role === "distributor") {
      router.push("/inventory"); // Redirect to /inventory if userRole is "distributor"
    } else if (role === "admin") {
      router.push("/admin"); // Redirect to /admin if userRole is "admin"
    } else if (role === "wholesaler") {
      router.push("/shop"); // Redirect to /shop if userRole is "wholesaler"
    } else {
      const getProducts = async () => {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setLoading(false); // Hide preloader once data is fetched
      };

      getProducts();
    }
  }, [router]); // Make sure to run this only when the router is ready

  if (loading) {
    return <Preloader />; // Show preloader while loading
  }

  return (
    <div className="relative">
      <Link href="/">
        {/* Hero section */}
        <div className="relative w-full px-0 md:px-6 lg:px-9 bg-black pt-8 overflow-hidden box-border pb-8">
          {/* Image */}
          <Image
            src="https://pouchesworldwide.com/strapi/uploads/puxx_banner_50583c11de.jpg"
            alt="Banner Image"
            width={1240}
            height={423}
            priority
            className="object-cover max-w-screen-2xl mx-auto w-full h-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px] lg:max-h-[700px] rounded-lg"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </Link>

      {/* Logo bar */}
      <Banner />

      {/* Center PrimaryList */}
      <div className="flex justify-center items-center py-8">
        <PrimaryList />
      </div>

      {/* Main banner 
  <div><BlackBanner /></div>*/}

      {/* Split section */}
      <div className="flex flex-col md:flex-row-reverse p-4 md:p-6 lg:p-4 justify-center items-center mt-[50px] mb-8 mx-auto max-w-[1220px]">
        {/* Product Cards - Left Side */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px] justify-items-center w-full">
            {!loading &&
              products
                .filter((product) => product.Fruit2 === true)
                .slice(0, 2)
                .map((product) => (
                  <div key={product.id} className="w-full sm:w-auto flex justify-center">
                    <ProductCard product={product} />
                  </div>
                ))}
          </div>
        </div>

        {/* Rect Banner - Right Side */}
        <Link href="/" className="w-full md:w-auto">
          <div className="h-[250px] sm:h-[350px] md:h-[452px] flex-shrink-0 flex justify-center items-center w-full md:w-auto mb-4 md:mb-0 md:mr-[50px] lg:mr-[95px]">
            <Image
              src="https://pouchesworldwide.com/strapi/uploads/rectban_301a0242af.jpg"
              alt="Banner Image"
              width={0}
              height={0}
              sizes="100vw"
              priority
              className="object-cover w-full h-full max-w-[400px] md:max-w-none rounded-lg"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </Link>
      </div>

      {/* Products grid */}
      <div className="relative">
        <div className="absolute inset-0 h-[290px] bg-black z-0 mt-[400px] hidden sm:block"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
            {!loading &&
              products
                .filter((product) => product.Fruit === true)
                .slice(0, 4)
                .map(
                  (
                    product // Display only the first 6 products
                  ) => (
                    <div key={product.id} className="w-full max-w-sm flex justify-center">
                      <ProductCard product={product} />
                    </div>
                  )
                )}
          </div>

          {/* Pagination 
    <div className="flex justify-center">
      <Pagination totalPages={10} />
    </div>*/}
        </div>
      </div>

      <div className="bg-black">
        <Feedback />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[200px]">
        <FAQ />
      </div>

      <Footer />
    </div>
  );
}
