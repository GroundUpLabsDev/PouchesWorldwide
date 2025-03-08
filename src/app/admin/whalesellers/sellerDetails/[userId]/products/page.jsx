
"use client";
import { useEffect, useState } from "react";
import { Search } from 'lucide-react';
import Products from "@/components/AdminUi/Products";

export default function ProductsPage({ userId }) {
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://146.190.245.42:1337/api/users");
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

    fetchUserData();
  }, [userId]);

  const products = [
    { id: 1, name: "Zyn Smooth 15", price: 7.86, image: "/berry.png", rating: 4 },
    { id: 2, name: "Zyn Citrus 10", price: 6.99, image: "/11.png", rating: 5 },
    { id: 3, name: "Zyn Citrus 10", price: 6.99, image: "/11.png", rating: 5 },
    { id: 4, name: "Zyn Citrus 10", price: 6.99, image: "/11.png", rating: 5 },
    { id: 5, name: "Zyn Citrus 10", price: 6.99, image: "/11.png", rating: 5 },
    { id: 6, name: "Zyn Citrus 10", price: 6.99, image: "/11.png", rating: 5 },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="w-full flex justify-center">
                <div className="w-full max-w-xs">
                  <Products product={product} />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No products found</div>
          )}
        </div>
      </div>
    </div>
  );
}
