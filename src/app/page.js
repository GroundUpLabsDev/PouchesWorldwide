"use client";



import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from "next/link";
import Header from "@/components/Header";
import PrimaryList from '@/components/Primarylist';
import ProductCard from '@/components/ProductCard';
import Feedback from '@/components/Feedback';
import FAQ from '@/components/FAQ';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import BlackBanner from '@/components/BlackBanner';
import Pagination from '@/components/Pagination';
import { fetchProducts } from "@/app/utils/fetchProducts"; // Import the fetchProducts function

export default function Home() {
  const [products, setProducts] = useState([]); // State to store fetched products
  
  // Fetch products when the component mounts
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };
  
    getProducts();
  }, []); // Empty dependency array means this effect runs only once

  const s_products = [
    {
      id: 1,
      Name: 'Zyn Smooth 15',
      price: 7.86,
      Image: '/berry.png',
      rating: 4,
    },
    {
      id: 2,
      Name: 'Zyn Citrus 10',
      price: 6.99,
      Image: '/11.png',
      rating: 5,
    },
  ]; 

  return (
    
    <div className="relative">
        <Header />


  <Link href="/">
    {/* Hero section */}
    <div className="relative w-full px-0 md:px-6 lg:px-9 bg-black pt-16 overflow-hidden box-border pb-4">
          {/* Image */}
          <Image
            src="/hero.jpg"
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

  {/* Main banner */}
  <div><BlackBanner /></div>

  {/* Split section */}
  <div className="flex flex-col lg:flex-row-reverse p-4 md:p-6 lg:p-4 justify-center items-center mt-[86px] mb-8 mx-auto max-w-[1220px]">
  
  {/* Product Cards - Left Side */}
  <div className="w-full lg:w-1/2 flex justify-center items-center">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px] justify-items-center">
      {s_products.map((product) => (
        <div key={product.id} className="w-full max-w-sm">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  </div>

  {/* Rect Banner - Right Side */}
  <Link href="/">
    <div className="h-[250px] sm:h-[350px] lg:h-[452px] flex-shrink-0 flex justify-center items-center w-full lg:w-auto mb-6 lg:mb-0 lg:mr-[95px]">
      <Image
        src="/rect-banner.png"
        alt="Banner Image"
        width={0}
        height={0}
        sizes="100vw"
        priority
        className="object-cover w-full h-full rounded-lg"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  </Link>

</div>



  

  {/* Products grid */}
  <div className="relative">
  <div className="absolute inset-0 h-[290px] bg-black z-0 mt-[880px] hidden sm:block"></div>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10 relative">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
      {products.slice(0, 8).map((product) => (  // Display only the first 6 products
        <div key={product.id} className="w-full max-w-sm flex justify-center">
          <ProductCard product={product} />
        </div>
      ))}
    </div>

    {/* Pagination */}
    <div className="flex justify-center">
      <Pagination totalPages={10} />
    </div>
  </div> 
</div>


  <div className='bg-black'>
    <Feedback />
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[200px]">
  <FAQ />
</div>


  <Footer />
</div>

  );
}
