"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from 'next/navigation';
import useCartStore from "@/store/cartStore";

export default function OrderRequestDetails({ product, noProducts, removeProduct, updateTotalPrice }) {
  const router = useRouter();
  const addCustomOrder = useCartStore((state) => state.addCustomOrder);

  const imageUrl = product.Image?.formats?.medium?.url || product.Image?.url || '/4.png'; 

  const [customNoProducts, setCustomNoProducts] = useState(noProducts);
  const [customPrice, setCustomPrice] = useState(product.price);

  // Optimized total price calculation
  const calculatedTotalPrice = useMemo(() => {
    return Math.max(0, customNoProducts * customPrice);
  }, [customNoProducts, customPrice]);

  // Send total price, customNoProducts, and customPrice to parent component
  useEffect(() => {
    updateTotalPrice(product.id, calculatedTotalPrice, customNoProducts, customPrice);
  }, [calculatedTotalPrice, customNoProducts, customPrice]);

  const handleRequestSubmit = () => {
    if (customNoProducts <= 0 || customPrice <= 0) {
      alert("Quantity and price must be greater than zero.");
      return;
    }

    const customOrder = {
      id: Date.now(),
      product,
      quantity: customNoProducts,
      requestedPrice: customPrice,
      totalAmount: calculatedTotalPrice,
      status: 'pending'
    };
    
    addCustomOrder(customOrder);
    router.push('/cart');
  };

  return (
    <div className="flex flex-col items-center mb-6">
      {/* Card */}
      <div className="h-[218px] w-[871px] relative bg-white rounded-[10px] border border-[#adb5bd]/40">
        {/* Product Image */}
        <div className="w-[197px] h-[197px] left-[9px] top-[10px] absolute">
          <Image
            src={`https://pouchesworldwide.com/strapi${imageUrl}`}
            alt={product.Name}
            width={141}
            height={146}
            className="w-[141px] h-[146px] left-[28px] top-[26px] absolute"
          />
        </div>

        {/* Product Name */}
        <div className="left-[226px] top-[26px] absolute text-center text-black text-[22px] font-medium capitalize">
          {product.Name}
        </div>

        {/* Product Details */}
        <div className="left-[226px] top-[75px] absolute text-[#2f4858] text-base font-medium">
          12mg | 15 pouches
        </div>

        {/* Number of Products and Price */}
        <div className="left-[224px] top-[124px] absolute flex gap-[19px]">
          {/* Number of Products */}
          <div className="w-[216px] flex flex-col gap-2">
            <div className="text-zinc-500 text-[15px] font-semibold">Number of Products</div>
            <input
              type="number"
              value={customNoProducts}
              onChange={(e) => setCustomNoProducts(Math.max(1, Number(e.target.value)))}
              className="w-full h-[54px] p-3 bg-white rounded-md border border-zinc-200 text-xl outline-none"
            />
          </div>

          {/* Multiplication Sign */}
          <div className="w-3 h-20 pt-[22px] flex items-center justify-center text-lg">X</div>

          {/* Price for a Product */}
          <div className="w-[216px] flex flex-col gap-2">
            <div className="text-zinc-500 text-[15px] font-semibold">Price for a Product</div>
            <div className="w-full h-[54px] p-3 bg-white rounded-md border border-zinc-200 flex items-center gap-1">
              <span className="text-[#3f6075] text-xl font-semibold">$</span>
              <input
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(Math.max(1, Number(e.target.value)))}
                className="text-zinc-500 text-xl outline-none w-full"
              />
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="left-[720px] top-[157px] absolute text-[#2f4858] text-[32px] font-medium">
          ${calculatedTotalPrice.toFixed(2)}
        </div>

        {/* Rating Stars */}
        <div className="left-[600px] top-[10px] absolute">
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <input
                key={index}
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
                defaultChecked={index < product.rating}
                disabled
              />
            ))}
          </div>
        </div>

        {/* Remove Button */}
        <div
          className="px-5 py-2.5 left-[756px] top-[10px] absolute bg-[#e22d6e]/10 rounded-[11px] cursor-pointer"
          onClick={() => removeProduct(product.id)}
        >
          <div className="text-center text-[#e22d6e] text-[15px] font-medium capitalize">
            remove
          </div>
        </div>
      </div>
    </div>
  );
}