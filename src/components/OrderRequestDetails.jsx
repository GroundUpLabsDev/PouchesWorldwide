"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import useCartStore from "@/store/cartStore";



export default function OrderRequestDetails({ product, totalPrice, noProducts, removeProduct }) {
  const router = useRouter();
  const addCustomOrder = useCartStore((state) => state.addCustomOrder);

  const imageUrl = product.Image?.formats?.medium?.url || product.Image?.url || '/4.png'; 
  const handleRemove = () => {
    removeCustomOrder(product.id); // Remove the product by its ID
  };
  const [customNoProducts, setCustomNoProducts] = useState(noProducts);
  const [customPrice, setCustomPrice] = useState(product.price);



  

  const calculateTotalPrice = () => {
    return customNoProducts * customPrice;
  };

  const handleRequestSubmit = () => {
    const customOrder = {
      id: Date.now(),
      product: product,
      quantity: customNoProducts,
      requestedPrice: customPrice,
      totalAmount: calculateTotalPrice(),
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
          <div className="w-[197px] h-[197px] left-0 top-0 absolute bg-white rounded-[5px]"></div>
          <Image
            src={`http://146.190.245.42:1337${imageUrl}`}
            alt={product.Name}
            width={141}
            height={146}
            className="w-[141px] h-[146px] left-[28px] top-[26px] absolute"
          />
        </div>

        {/* Product Name */}
        <div className="left-[226px] top-[10px] absolute text-black text-sm font-normal font-['Poppins'] capitalize">
          product name
        </div>
        <div className="left-[225px] top-[26px] absolute text-center text-black text-[22px] font-medium font-['Poppins'] capitalize">
          {product.Name}
        </div>

        {/* Product Details */}
        <div className="left-[226px] top-[75px] absolute text-[#2f4858] text-base font-medium font-['Poppins'] leading-snug">
          12mg | 15 pouches
        </div>

        {/* Number of Products and Price */}
        <div className="left-[224px] top-[124px] absolute justify-start items-center gap-[19px] inline-flex">
          {/* Number of Products */}
          <div className="w-[216px] flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch h-[18px] flex-col justify-start items-start flex">
              <div className="self-stretch text-zinc-500 text-[15px] font-['Inter'] font-semibold leading-[18px]">
                Number of Products
              </div>
            </div>
            <div className="self-stretch h-[54px] p-3 bg-white rounded-md border border-zinc-200 justify-start items-center gap-2 inline-flex overflow-hidden">
              <input
                type="number"
                value={customNoProducts}
                onChange={(e) => setCustomNoProducts(Number(e.target.value))}
                className="grow shrink basis-0 text-zinc-500 text-xl font-normal font-['Inter'] leading-7 outline-none"
              />
            </div>
          </div>

          {/* Multiplication Sign */}
          <div className="w-3 h-20 pt-[22px] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="self-stretch text-black text-lg font-normal font-['Inter'] leading-[25.20px]">
              X
            </div>
          </div>

          {/* Price for a Product */}
          <div className="w-[216px] flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch h-[18px] flex-col justify-start items-start flex">
              <div className="self-stretch text-zinc-500 text-[15px] font-semibold font-['Inter'] leading-[18px]">
                Price for a Product
              </div>
            </div>
            <div className="self-stretch h-[54px] p-3 bg-white rounded-md border border-zinc-200 justify-start items-center gap-2 inline-flex overflow-hidden">
              <div className="flex items-center gap-1">
                <span className="text-[#3f6075] text-xl font-semibold font-['Poppins'] leading-7">
                  $
                </span>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="text-zinc-500 text-xl font-normal font-['Inter'] leading-7 outline-none w-full"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="left-[720px] top-[157px] absolute text-[#2f4858] text-[32px] font-medium font-['Poppins'] leading-[44.80px] overflow-x-auto whitespace-nowrap">
        ${calculateTotalPrice().toFixed(2)}
        </div>

        {/* Rating Stars */}
        <div className="left-[600px] top-[10px] absolute justify-center items-center">
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
          className="px-5 py-2.5 left-[756px] top-[10px] absolute bg-[#e22d6e]/10 rounded-[11px] justify-center items-center gap-2.5 inline-flex cursor-pointer"
          onClick={removeProduct}// Attach the remove function
        >
          <div className="text-center text-[#e22d6e] text-[15px] font-medium font-['Poppins'] capitalize">
            remove
          </div>
        </div>
      </div>
      


    </div>
  );
}
