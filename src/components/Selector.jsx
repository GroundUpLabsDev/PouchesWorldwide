"use client";
import { useState } from "react";

const Selector = ({ selectedQuantity, setSelectedQuantity, selectorOptions = [] }) => {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      {selectorOptions.length > 0 ? (
        selectorOptions.map((option) => (
          <label
            key={option.id}
            className={`card flex flex-col justify-center items-center gap-4 w-64 p-6 rounded-lg text-center cursor-pointer transition-all duration-300 border-2 ${
              selectedQuantity === option.Cans
                ? "bg-yellow-500 text-white border-yellow-500"
                : "bg-gray-200 text-gray-800 border-gray-300"
            }`}
            onClick={() => setSelectedQuantity(option.Cans)}
          >
            <input
              type="radio"
              name="cans"
              className="hidden"
              checked={selectedQuantity === option.Cans}
              readOnly
            />
            {option.BestDeal && (
              <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-bl-lg text-xs">
                Best Deal
              </div>
            )}
            <div className="text-lg font-semibold">{option.Cans} Cans</div>
            <div className="text-2xl font-bold">${option.Price.toFixed(2)}</div>
          </label>
        ))
      ) : (
        <p>No quantity options available.</p>
      )}
    </div>
  );
};

export default Selector;
