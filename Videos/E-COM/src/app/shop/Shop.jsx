"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useRouter, useSearchParams } from "next/navigation"; // Use these to access URL params
import { fetchProducts } from "@/app/utils/fetchProducts"; // Import the fetchProducts function

const Shop = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [searchQuery, setSearchQuery] = useState(""); // State to track search query

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search"); // Get search query from URL

  // Fetch products when the component mounts
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []); // Empty dependency array means this effect runs only once

  useEffect(() => {
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl); // Set search query from URL when available
    }
  }, [searchFromUrl]);

  // Filter products based on search query (case insensitive)
  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.Name && product.Name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products; // If no search query, show all products

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <div className="mt-4"></div>
    {/* <Banner />*/}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mt-8">
          {/* Display filtered products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 justify-items-center">
            {filteredProducts.map((product) => (
              <div key={product.id} className="w-full max-w-sm flex justify-center">
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
