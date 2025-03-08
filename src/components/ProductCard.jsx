"use client";

import React, { useState } from "react";
import Link from "next/link";
import useCartStore from "@/store/cartStore"; // Import Zustand store

const ProductCard = ({ product }) => {
  const { id, Name, Stock, Description, category, Image, rating } = product;

  // Get the full URL for the image from Strapi (update the URL dynamically)
  const imageUrl = Image?.formats?.medium?.url || Image?.url || '/4.png'; 
  const fullImageUrl = `http://146.190.245.42:1337${imageUrl}`; // Assuming Strapi is hosted on localhost:1337
  
  const addToCart = useCartStore((state) => state.addToCart);

  // State to track the selected quantity (as number)
  const [selectedCans, setSelectedCans] = useState(15); // Set default quantity to 15
  const [currentPrice, setCurrentPrice] = useState(7.50);

  // Function to update the price based on the selected quantity
  const handleQuantityChange = (event) => {
    const selectedValue = parseInt(event.target.value); // Parse selected value to number
    setSelectedCans(selectedValue);

    switch (selectedValue) {
      case 15:
        setCurrentPrice(7.50);
        break;
      case 30:
        setCurrentPrice(14.50);
        break;
      case 60:
        setCurrentPrice(28.50);
        break;
      case 90:
        setCurrentPrice(42.50);
        break;
      default:
        setCurrentPrice(7.50);
    }
  };

  return (
    <div className="card w-[297px] h-[470px] bg-neutral shadow-xl relative flex flex-col cursor-pointer">
      {/* Product Link */}
      <Link href={`/product/${id}`} passHref>
        <figure className="px-8 pt-6">
          {imageUrl && (
            <img
              src={fullImageUrl} // Use the full image URL here
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
          {/* Product Name */}
          <Link href={`/product/${id}`} passHref>
            <h2 className="text-center font-semibold text-primary text-[22px] font-poppins">
              {Name}
            </h2>
          </Link>

          {/* Rating Stars */}
          <div className="flex justify-center">
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
        </div>

        {/* Product Details */}
        <div className="flex justify-between items-center mt-4">
          <select
            className="select select-bordered select-md w-32"
            value={selectedCans}
            onChange={handleQuantityChange}
          >
            <option value={15}>15 Cans</option>
            <option value={30}>30 Cans</option>
            <option value={60}>60 Cans</option>
            <option value={90}>90 Cans</option>
          </select>
          <span className="text-xl font-semibold">${currentPrice.toFixed(2)}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          className="btn bg-[radial-gradient(circle,_#fae255_0%,_#a06a0f_100%)] border-none text-sm px-3 py-2 w-full mt-2 mb-4"
          onClick={(e) => {
            e.preventDefault(); // Prevents navigation from Link wrapping the card
            addToCart({
              ...product,
              price: currentPrice,
              selectedCans, // Send the selectedCans to the cart store
              imageUrl: fullImageUrl, // Send the full image URL to the cart store
            });
          }}
        >
          Add To Cart +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
