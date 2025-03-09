import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RequestCards = ({ product, addToRequest }) => {
  const { id, Name, price, Image, rating } = product;
  const imageUrl = product.Image?.formats?.medium?.url || product.Image?.url || '/4.png'; 

  return (
      <div className="card w-[297px] h-[452px] bg-neutral shadow-xl relative flex flex-col cursor-pointer">
        {/* Product Image */}
        <figure className="px-8 pt-6">
          <img
            src={`https://pouchesworldwide.com/strapi${imageUrl}`}
            alt={Name}
            width={200}
            height={200}
            className="rounded-lg"
          />
        </figure>

        {/* Card Content */}
        <div className="card-body p-6 flex flex-col flex-grow">
          <div className="flex flex-col items-center">
          <div className="text-[#2f4858] text-base font-medium font-['Poppins'] leading-snug">
          12mg | 15 pouches
        </div>
            {/* Product Name */}
            <h2 className="text-center font-semibold text-primary text-[22px] font-poppins">
              {Name}
            </h2>

            {/* Rating Stars */}
            <div className="flex justify-center">
              <div className="rating">
                {[...Array(5)].map((_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name={`rating-${name}`}
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked={index < rating}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex justify-center items-center mt-4">
            <span className="text-xl font-semibold">${price} - $400</span>
          </div>

          {/* Add to Cart Button */}
          <button 
          onClick={() => addToRequest(product)}
          className="btn bg-amber-400 hover:bg-amber-500 border-none text-sm px-3 py-2 w-full mt-4 capitalize">
          Add to the request + 
          </button>
        </div>
      </div>

  );
};

export default RequestCards;
