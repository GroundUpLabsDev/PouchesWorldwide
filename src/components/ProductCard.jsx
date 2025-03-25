"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useCartStore from "@/store/cartStore";
import { getUserRole } from "@/app/utils/getUserRole";

const ProductCard = ({ product }) => {
  const { id, Name, Stock, Description, category, Image, rating, documentId } = product;
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null); // Store user ID
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const imageUrl = Image?.formats?.medium?.url || Image?.url || "/4.png";
  const fullImageUrl = `https://pouchesworldwide.com/strapi${imageUrl}`;

  const addToCart = useCartStore((state) => state.addToCart);

  // State for selected quantities (mg) and their counts
  const [selectedQuantities, setSelectedQuantities] = useState([]);

  useEffect(() => {
    // Fetch user role & username
    const fetchUserRole = async () => {
      const user = await getUserRole();
      setUserRole(user?.role);
      setUsername(user?.username);
    };
    fetchUserRole();

    // Get user data from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser?.id);
      }
    }
  }, []);

  // Handle quantity button click
  const handleQuantityClick = (mg) => {
    setSelectedQuantities((prev) => {
      const existingIndex = prev.findIndex((item) => item.mg === mg);
      if (existingIndex >= 0) {
        // If the quantity already exists, increment its count
        const updatedQuantities = [...prev];
        updatedQuantities[existingIndex].count += 1;
        return updatedQuantities;
      } else {
        // If the quantity doesn't exist, add it with a count of 1
        return [...prev, { mg, count: 1 }];
      }
    });
  };

  // Handle increment and decrement for a specific quantity
  const handleIncrement = (mg) => {
    setSelectedQuantities((prev) =>
      prev.map((item) =>
        item.mg === mg ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const handleDecrement = (mg) => {
    setSelectedQuantities((prev) =>
      prev
        .map((item) =>
          item.mg === mg ? { ...item, count: Math.max(0, item.count - 1) } : item
        )
        .filter((item) => item.count > 0) // Remove if count reaches 0
    );
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="card w-[297px] h-[470px] bg-neutral shadow-xl relative flex flex-col cursor-pointer animate-pulse">
      {/* Image Skeleton */}
      <div className="px-8 pt-6">
        <div className="w-[200px] h-[200px] bg-gray-300 rounded-lg"></div>
      </div>

      {/* Content Skeleton */}
      <div className="card-body p-6 flex flex-col flex-grow">
        <div className="flex flex-col items-center">
          {/* Product Name Skeleton */}
          <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>

          {/* Document ID Skeleton */}
          <div className="w-1/2 h-4 bg-gray-300 rounded mb-4"></div>

          {/* Rating Stars Skeleton */}
          <div className="flex justify-center mt-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="w-4 h-4 bg-gray-300 rounded-full mx-1"></div>
            ))}
          </div>
        </div>

        {/* Price and Selector Skeleton */}
        <div className="flex justify-between items-center mt-4">
          <div className="w-32 h-10 bg-gray-300 rounded"></div>
          <div className="w-16 h-6 bg-gray-300 rounded"></div>
        </div>

        {/* Add to Cart Button Skeleton */}
        <div className="w-full h-10 bg-gray-300 rounded mt-2 mb-6"></div>
      </div>
    </div>
  );

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (selectedQuantities.length === 0) {
      setError("Please select at least one strength.");
      return;
    }

    // Create separate orders for each selected strength
    selectedQuantities.forEach((item) => {
      const order = {
        ...product, // Spread the product details
        price: product.price, // Use the product's base price
        strength: item.mg, // Strength (e.g., 6mg, 22mg)
        count: item.count, // Quantity selected for this strength
        imageUrl: fullImageUrl, // Full image URL
      };
      addToCart(order); // Add each order to the cart
    });

    // Reset selected quantities after adding to cart
    setSelectedQuantities([]);
  };

  return (
    <>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="card w-[300px] bg-neutral shadow-xl relative flex flex-col cursor-pointer">
          {/* Product Link */}
          <Link href={`/product/${id}`} passHref>
            <figure className="px-8 pt-6">
              {imageUrl && (
                <img
                  src={fullImageUrl}
                  alt={Name}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              )}
            </figure>
          </Link>

          {/* Card Content */}
          <div className="card-body p-6 flex flex-col flex-grow">
            <div className="flex flex-col items-center">
              {/* Display User ID */}
              <div style={{ display: "none" }}>
                {userId && <p className="text-sm text-gray-400">User ID: {userId}</p>}
              </div>

              {/* Product Name */}
              <Link href={`/product/${id}`} passHref>
                <h2 className="text-center font-semibold text-primary text-[16px] font-poppins">
                  {Name}
                </h2>
              </Link>

              {/* Rating Stars */}
              <div className="flex justify-center mt-2">
                <div className="rating">
                  {[...Array(5)].map((_, index) => (
                    <input
                      key={index}
                      type="radio"
                      name={`rating-${id}`}
                      className={`mask mask-star-2 ${index < rating ? "" : "bg-gray-400"}`}
                      style={index < rating ? { background: "linear-gradient(to right, #fae255 0%, #a06a0f 100%)" } : {}}
                      defaultChecked={index < rating}
                      readOnly
                      disabled
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-semibold">Price Per Unit</span>
              <span className="text-xl font-semibold">${product.price.toFixed(2)}</span>
            </div>

            {/* Quantity Buttons */}
            <div className="flex flex-col gap-4 mt-4">
              {/* Top Row: 6mg, 12mg, 16mg */}
              <div className="flex justify-between">
                {[6, 12, 16].map((mg) => {
                  const selectedItem = selectedQuantities.find((item) => item.mg === mg);
                  return (
                    <div key={mg} className="flex flex-col items-center">
                      <button
                        onClick={() => handleQuantityClick(mg)}
                        className={`btn-sm rounded-lg w-[75px] h-[5px] ${
                          selectedItem
                            ? "bg-black text-white text-bold"
                            : "bg-gray-300"
                        } border-none text-base `}
                      >
                        {mg}mg
                      </button>
                      {selectedItem && (
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => handleDecrement(mg)}
                            className="bg-gray-300 text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-base font-semibold">{selectedItem.count}</span>
                          <button
                            onClick={() => handleIncrement(mg)}
                            className="bg-gray-300 text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Row: 22mg */}
              <div className="flex justify-center">
                {[22].map((mg) => {
                  const selectedItem = selectedQuantities.find((item) => item.mg === mg);
                  return (
                    <div key={mg} className="flex flex-col items-center">
                      <button
                        onClick={() => handleQuantityClick(mg)}
                        className={`btn-sm rounded-lg w-[250px] ${
                          selectedItem
                            ? "bg-black text-white text-bold"
                            : "bg-gray-300"
                        } border-none text-sm  px-3 py-2`}
                      >
                        {mg}mg
                      </button>
                      {selectedItem && (
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => handleDecrement(mg)}
                            className="bg-gray-300 text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-base font-semibold">{selectedItem.count}</span>
                          <button
                            onClick={() => handleIncrement(mg)}
                            className="bg-gray-300 text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              className="btn bg-[radial-gradient(circle,_#fae255_0%,_#a06a0f_100%)] border-none text-sm px-3 py-2 w-full mt-2 mb-6"
              onClick={handleAddToCart}
            >
              Add To Cart +
            </button>

            {/* Error Messages */}
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;