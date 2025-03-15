"use client";
import React, { useState, useEffect } from "react";
import { CircleX } from "lucide-react";

const Products = ({ product, userId }) => {
  const { id, Name, Image, Selector, documentId } = product;

  // Generate the image URL
  const imageUrl = Image?.formats?.medium?.url || Image?.url || '/4.png';
  const fullImageUrl = `https://pouchesworldwide.com/strapi${imageUrl}`;

  // Manually set the userId
  const manualUserId = +userId; // Replace this with your desired userId

  const [customPrices, setCustomPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  // Quantity and Price Input State
  const [customQuantity, setCustomQuantity] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [customEntries, setCustomEntries] = useState([]);
  const [removedEntries, setRemovedEntries] = useState([]); // Track removed entries

  // Sort the default Selector by Position
  const sortedSelector = Selector ? [...Selector].sort((a, b) => a.Position - b.Position) : [];
  const defaultSelection = sortedSelector.length > 0 ? sortedSelector[0] : { Cans: 0, Price: 0 };

  // Fetch custom prices from the server
  useEffect(() => {
    const fetchCustomPrices = async () => {
      if (!manualUserId) return;

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://pouchesworldwide.com/strapi/api/products/${documentId}?populate[0]=wprice&populate[1]=wprice.user&populate[2]=wprice.price`
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // Find the user's custom prices
        const userProduct = data.data.wprice.find((wp) => wp.user.id === manualUserId);
        if (userProduct) {
          setCustomPrices(userProduct.price); // Set custom prices if available
        } else {
          setCustomPrices(null); // No custom prices for this user
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCustomPrices();
  }, [manualUserId, documentId]);

  // Combine existing custom prices and new custom entries
  const pricesToUse = [
    ...(customPrices || []), // Existing custom prices from the server
    ...customEntries, // New custom prices added by the user
  ].filter(
    (entry) =>
      !removedEntries.some(
        (removed) =>
          removed.Cans === entry.Cans && removed.Price === entry.Price
      )
  );

  // Add a custom entry
  const addCustomEntry = () => {
    if (customQuantity && customPrice) {
      setCustomEntries([
        ...customEntries,
        { Cans: customQuantity, Price: parseFloat(customPrice) }, // Use Cans and Price for consistency
      ]);
      setCustomQuantity("");
      setCustomPrice("");
    }
  };

  // Remove a custom entry
  const removeCustomEntry = (index) => {
    const entryToRemove = pricesToUse[index];
    setRemovedEntries([...removedEntries, entryToRemove]); // Track removed entries
  };

  // Save custom prices
  const savePrices = async () => {
    try {
      const payload = {
        data: {
          wprice: [
            {
              price: pricesToUse.map((entry) => ({
                Cans: entry.Cans,
                Price: entry.Price,
                BestDeal: false,
              })),
              user: {
                id: manualUserId,
              },
            },
          ],
        },
      };

      const response = await fetch(
        `https://pouchesworldwide.com/strapi/api/products/${documentId}?populate[0]=wprice&populate[1]=wprice.user&populate[2]=wprice.price`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to save prices");

      alert("Prices saved successfully!");
      setRemovedEntries([]); // Clear removed entries after successful save
      window.location.reload();
    } catch (error) {
      console.error("Error saving prices:", error);
    }
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="card w-[333px] bg-neutral shadow-xl relative flex flex-col cursor-pointer animate-pulse">
      {/* Image Skeleton */}
      <div className="px-8 pt-6">
        <div className="w-[200px] h-[200px] bg-gray-300 rounded-lg"></div>
      </div>

      {/* Content Skeleton */}
      <div className="card-body p-6 flex flex-col flex-grow">
        {/* Product Name Skeleton */}
        <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>

        {/* Price Entries Skeleton */}
        <div className="space-y-2">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="w-full h-[79.38px] bg-gray-300 rounded-lg"></div>
          ))}
        </div>

        {/* Input Fields Skeleton */}
        <div className="flex items-center mb-2 space-x-4 mt-4">
          <div className="w-1/4 h-[34px] bg-gray-300 rounded-lg"></div>
          <div className="w-1/4 h-[34px] bg-gray-300 rounded-lg"></div>
          <div className="w-1/4 h-[34px] bg-gray-300 rounded-lg"></div>
        </div>

        {/* Save Button Skeleton */}
        <div className="w-full h-10 bg-gray-300 rounded-lg mt-4"></div>
      </div>
    </div>
  );

  return (
    <>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="card w-[333px] bg-neutral shadow-xl relative flex flex-col cursor-pointer">
          <figure className="px-8 pt-6">
            {imageUrl && <img src={fullImageUrl} alt={Name} width={200} height={200} className="rounded-lg" />}
          </figure>
          <div className="card-body p-6 flex flex-col flex-grow">
            <h2 className="text-center font-semibold text-primary text-[22px] font-poppins">{Name}</h2>

            {/* Display user's product prices */}
            <div className="item-center justify-center rounded-lg">
              {pricesToUse.map((price, index) => (
                <div key={index} className="flex justify-between items-center border border-[#adb5bd] p-2 rounded-lg w-[291.52px] h-[79.38px] mb-2">
                  <span className="text-[#282f44] text-[22px] font-medium font-['Poppins']">
                    {price.Cans} Cans ${price.Price.toFixed(2)}
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

            {/* Quantity and Price Input */}
            <div className="mb-1 border pl-2 pt-2 rounded-lg border-[#3f6075]/40">
              <div className="flex items-center mb-2 space-x-4">
                <div className="flex flex-col w-1/4 rounded-lg">
                  <label className="text-sm mb-1 text-left">Cans</label>
                  <input
                    type="number"
                    value={customQuantity}
                    onChange={(e) => setCustomQuantity(e.target.value)}
                    className="px-4 py-2 border border-[#3f6075]/90 rounded-lg h-[34px] w-[66px]"
                  />
                </div>
                <div className="flex flex-col w-1/4">
                  <label className="text-sm mb-1 text-left">Price</label>
                  <input
                    type="number"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    className="px-4 py-2 border border-[#3f6075]/90 rounded-lg h-[34px] w-[66px]"
                  />
                </div>
                <button
                  onClick={addCustomEntry}
                  disabled={customEntries.length >= 10}
                  className={`btn btn-sm text-white mt-6 h-10 px-5 py-2.5 ${
                    customEntries.length >= 10 ? "bg-gray-400 cursor-not-allowed" : "bg-[#009b7c]"
                  }`}
                >
                  Add +
                </button>
              </div>
            </div>

            {/* User ID and Product ID */}
            <p className="text-center text-sm text-gray-500">User ID: {manualUserId} | Product ID: {id}</p>

            {/* Save Button */}
            <button
              onClick={savePrices}
              className="btn text-black bg-[radial-gradient(circle,_#fae255_0%,_#a06a0f_100%)] hover:bg-amber-500 border-none text-sm px-3 py-2 w-full mb-4"
            >
              Save Prices
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;