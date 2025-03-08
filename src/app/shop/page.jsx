"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/app/utils/fetchProducts"; // Import the fetchProducts function

const Shop = () => {
  const [products, setProducts] = useState([]); // State to store fetched products

  // Fetch products when the component mounts
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []); // Empty dependency array means this effect runs only once

  return (
    <>
    <Header />
    <div className="mt-4"></div>
    <Banner />
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Removed tab buttons */}
      <div className="mt-8">
        {/* Display all products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 justify-items-center">
          {products.map((product) => (
            <div key={product.id} className="w-full max-w-sm flex justify-center"> {/* Center ProductCard on small screens */}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Shop;