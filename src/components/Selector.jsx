"use client";
import { useState } from "react";

const Selector = ({ selectedQuantity, setSelectedQuantity }) => {
  const cards = [
    { id: 0, cans: "15 Cans", price: "7.50$", bestDeal: false },
    { id: 1, cans: "30 Cans", price: "14.50$", bestDeal: false },
    { id: 2, cans: "60 Cans", price: "28.50$", bestDeal: true },
    { id: 3, cans: "90 Cans", price: "42.50$", bestDeal: false },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      {cards.map((card) => (
        <label
          key={card.id}
          className={`card flex flex-col justify-center items-center gap-4 w-64 p-6 rounded-lg text-center cursor-pointer transition-all duration-300 border-2 ${
            selectedQuantity === card.cans
              ? "bg-yellow-500 text-white border-yellow-500"
              : "bg-gray-200 text-gray-800 border-gray-300"
          }`}
          onClick={() => setSelectedQuantity(card.cans)}
        >
          <input
            type="radio"
            name="cans"
            className="hidden"
            checked={selectedQuantity === card.cans}
            readOnly
          />
          {card.bestDeal && (
            <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-bl-lg text-xs">
              Best Deal
            </div>
          )}
          <div className="text-lg font-semibold">{card.cans}</div>
          <div className="text-2xl font-bold">{card.price}</div>
        </label>
      ))}
    </div>
  );
};

export default Selector;
