"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useCartStore from "@/store/cartStore";
import { getUserRole } from "@/app/utils/getUserRole";

const ProductCard = ({ product }) => {
  const { id, Name, Stock, Description, category, Image, rating, Selector, documentId } = product;
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null); // Store user ID
  const [customPrices, setCustomPrices] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const imageUrl = Image?.formats?.medium?.url || Image?.url || "/4.png";
  const fullImageUrl = `https://pouchesworldwide.com/strapi${imageUrl}`;

  const addToCart = useCartStore((state) => state.addToCart);

  // Sort Selector by Position
  const sortedSelector = Selector ? [...Selector].sort((a, b) => a.Position - b.Position) : [];
  const defaultSelection = sortedSelector.length > 0 ? sortedSelector[0] : { Cans: 0, Price: 0 };

  const [selectedCans, setSelectedCans] = useState(defaultSelection.Cans);
  const [currentPrice, setCurrentPrice] = useState(defaultSelection.Price);

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

  const handleQuantityChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    setSelectedCans(selectedValue);

    // Determine which prices to use (custom or default)
    const pricesToUse = customPrices || sortedSelector;

    // Find the selected price based on the selected quantity
    const selectedOption = pricesToUse.find((item) => item.Cans === selectedValue);
    setCurrentPrice(selectedOption ? selectedOption.Price : 0);
  };

  const fetchCustomPrices = async (userId) => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://pouchesworldwide.com/strapi/api/products/${documentId}?populate[0]=wprice&populate[1]=wprice.user&populate[2]=wprice.price`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Find the user's custom prices
      const userProduct = data.data.wprice.find((wp) => wp.user.id === userId);
      if (userProduct) {
        setCustomPrices(userProduct.price); // Set custom prices if available

        // Automatically select the first option from custom prices
        if (userProduct.price.length > 0) {
          setSelectedCans(userProduct.price[0].Cans);
          setCurrentPrice(userProduct.price[0].Price);
        }
      } else {
        setCustomPrices(null); // No custom prices for this user

        // Automatically select the first option from default Selector
        if (sortedSelector.length > 0) {
          setSelectedCans(sortedSelector[0].Cans);
          setCurrentPrice(sortedSelector[0].Price);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCustomPrices(userId); // Fetch custom prices when userId changes
    }
  }, [userId]);

  // Determine which prices to use (custom or default)
  const pricesToUse = customPrices || sortedSelector;

  // Update currentPrice when customPrices or selectedCans changes
  useEffect(() => {
    const selectedOption = pricesToUse.find((item) => item.Cans === selectedCans);
    setCurrentPrice(selectedOption ? selectedOption.Price : 0);
  }, [customPrices, selectedCans, pricesToUse]);

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

  return (
    <>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="card w-[297px] h-[470px] bg-neutral shadow-xl relative flex flex-col cursor-pointer">
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

          {
            product.Stock == 0 &&
            (<div className="absolute right-10 top-10 bg-red-700 text-white py-2 px-3 rounded-md">
            <p>Out Of Stock</p>
          </div>)}

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

              {/* Display Document ID 
              <div className="text-sm text-gray-400">
                Document ID: {documentId}
              </div>*/}

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
              <select
                className="select select-bordered select-md w-32"
                value={selectedCans}
                onChange={handleQuantityChange}
              >
                {pricesToUse.map((option) => (
                  <option key={option.id} value={option.Cans}>
                    {option.Cans} Cans
                  </option>
                ))}
              </select>
              <span className="text-xl font-semibold">${currentPrice.toFixed(2)}</span>
            </div>

            {/* Add to Cart Button */}
            <button
              className="btn bg-[radial-gradient(circle,_#fae255_0%,_#a06a0f_100%)] border-none text-sm px-3 py-2 w-full mt-2 mb-6"
              onClick={(e) => {
                e.preventDefault();
                addToCart({
                  ...product,
                  price: currentPrice,
                  selectedCans,
                  imageUrl: fullImageUrl,
                });
              }}
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