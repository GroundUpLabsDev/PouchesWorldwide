"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CircleX } from "lucide-react"; // Import X icon from Lucide

const Products = ({ product }) => {
  const { id, name, price, image, rating } = product;

  // State to track the selected quantity, price, and custom entries
  const [quantity, setQuantity] = useState(15);
  const [currentPrice, setCurrentPrice] = useState(7.50);
  const [customEntries, setCustomEntries] = useState([]);
  const [customQuantity, setCustomQuantity] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [cardHeight, setCardHeight] = useState(470); // State to control card height

  // Function to update the price based on the selected quantity
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);

    // Update price based on the selected quantity
    if (newQuantity === 15) {
      setCurrentPrice(7.50);
    } else if (newQuantity === 30) {
      setCurrentPrice(14.50);
    } else if (newQuantity === 60) {
      setCurrentPrice(28.50);
    } else if (newQuantity === 90) {
      setCurrentPrice(42.50);
    }
  };

  const addCustomEntry = () => {
    if (customQuantity && customPrice) {
      setCustomEntries([
        ...customEntries,
        { quantity: customQuantity, price: parseFloat(customPrice) },
      ]);
      setCustomQuantity("");
      setCustomPrice("");
      
      // Increase card height when a custom entry is added
      setCardHeight(cardHeight + 50); // Adjust this value as needed
    }
  };

  const removeCustomEntry = (index) => {
    const updatedEntries = customEntries.filter((_, i) => i !== index);
    setCustomEntries(updatedEntries);
    
    // Decrease card height when a custom entry is removed
    setCardHeight(cardHeight - 50); // Adjust this value as needed
  };

  return (
    <div
  className="card w-[333px] bg-neutral shadow-xl relative flex flex-col cursor-pointer"
  style={{ minHeight: `${cardHeight}px` }} // Use minHeight instead of height
>
  {/* Product Image */}
  <figure className="px-4 pt-6">
    <Image
      src={image}
      alt={name}
      width={150}
      height={150}
      className="rounded-lg"
    />
  </figure>

  {/* Card Content */}
  <div className="card-body p-6 flex flex-col flex-grow">
    <div className="flex flex-col items-center">
      {/* Product Name */}
      <h2 className="text-center font-semibold text-primary text-[22px] font-poppins">
        {name}
      </h2>

      {/* Rating Stars */}
      <div className="flex justify-center">
        <div className="rating">
          {[...Array(5)].map((_, index) => (
            <input
              key={index}
              type="radio"
              name={`rating-${id}`}
              className="mask mask-star-2 bg-orange-400"
              defaultChecked={index < rating}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>

    {/* Custom Entries */}
<div className="item-center justify-center rounded-lg">
  {customEntries.map((entry, index) => (
    <div
      key={index}
      className="flex justify-between items-center border border-[#adb5bd] p-2 rounded-lg w-[291.52px] h-[79.38px] mb-2"
    >
      <span className="text-[#282f44] text-[22px] font-medium font-['Poppins']">
        {entry.quantity} Cans <span className="mr-[50px]"></span> $
        {entry.price.toFixed(2)}
      </span>
      <button
        onClick={() => removeCustomEntry(index)}
        className="text-red-500"
      >
        <CircleX size={22} />
      </button>
    </div>
  ))}
</div>

{/* Custom Entry Inputs */}
<div className="mb-1 border pl-2 pt-2 rounded-lg border-[#3f6075]/40">
  <div className="flex items-center mb-2 space-x-4">
    <div className="flex flex-col w-1/4 rounded-lg">
      <label htmlFor="quantity" className="text-sm mb-1 text-left">
        Cans
      </label>
      <input
        id="quantity"
        type="number"
        value={customQuantity}
        onChange={(e) => setCustomQuantity(e.target.value)}
        className="px-4 py-2 border border-[#3f6075]/90 rounded-lg h-[34px] w-[66px]"
      />
    </div>

    <div className="flex flex-col w-1/4">
      <label htmlFor="price" className="text-sm mb-1 text-left">
        Price
      </label>
      <input
        id="price"
        type="number"
        value={customPrice}
        onChange={(e) => setCustomPrice(e.target.value)}
        className="px-4 py-2 border border-[#3f6075]/90 rounded-lg h-[34px] w-[66px]"
      />
    </div>

    <button
      onClick={addCustomEntry}
      disabled={customEntries.length >= 4} // Disable when 4 entries exist
      className={`btn btn-sm text-white mt-6 h-10 px-5 py-2.5 ${
        customEntries.length >= 4 ? "bg-gray-400 cursor-not-allowed" : "bg-[#009b7c]"
      }`}
    >
      Add +
    </button>
  </div>
</div>


    {/* Save Prices Button */}
    <button className="btn text-black bg-[radial-gradient(circle,_#fae255_0%,_#a06a0f_100%)] hover:bg-amber-500 border-none text-sm px-3 py-2 w-full mb-4">
      Save Prices
    </button>
  </div>
</div>
  );
};

export default Products;
