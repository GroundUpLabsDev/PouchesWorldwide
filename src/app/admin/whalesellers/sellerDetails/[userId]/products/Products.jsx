"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Products from "@/components/AdminUi/Products";
import { useRouter, useSearchParams, useParams } from "next/navigation"; // Import useParams
import { fetchProducts } from "@/app/utils/fetchProducts"; // Import fetchProducts

export default function ProductsPage() {
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search"); // Get search query from URL
  const { userId } = useParams(); // Get userId from URL dynamically

  // Fetch products when the component mounts
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchFromUrl]);

  // Filter products based on search query (case insensitive)
  const filteredProducts = searchQuery
    ? products.filter(
        (product) =>
          product.Name &&
          product.Name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://pouchesworldwide.com/strapi/api/users");
        const users = await response.json();

        // Find the user by userId
        const user = users.find((user) => user.id === Number(userId));

        if (user) {
          setUsername(user.username);
        } else {
          setUsername("Unknown User");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername("Error loading user");
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);
  

  return (
    <div>
      <div className="h-[30px] px-2.5 py-[3px] bg-black flex items-center gap-2.5 mb-2 w-[200px]">
  <div className="text-white text-base font-normal font-['Poppins'] capitalize">
  wholesaler account
  </div>
</div>
  <h2 className="text-black text-[32px] font-semibold font-['Poppins'] text-left capitalize mb-8">
    manage <span className="text-black">{username}'s price list</span>
  </h2>
  <div className="mb-8 flex items-center justify-between">
    <div className="text-lg font-medium text-gray-700">Search item for modify</div>
    <input
      type="text"
      placeholder="Search products..."
      className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:max-w-xs"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    
  </div>





      {/* Product Cards */}
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[200px]">
        {filteredProducts.map((product) => (
              <div key={product.id} className="w-full max-w-sm flex justify-center">
                <Products product={product} userId={ userId }/>
              </div>
            ))}
          

        </div>
      </div>
    </div>
  );
}
 