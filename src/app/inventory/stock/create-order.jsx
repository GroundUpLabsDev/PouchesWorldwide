

"use client";

import Image from 'next/image';
import { useState, useEffect } from "react";
import { ArrowRight } from 'lucide-react';
import { fetchProducts } from "@/app/utils/fetchProducts";

const CreateOrder = ({ productId }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    streetAddress: "",
    city: "",
    state: "",
    trackingNumber: "",
    numberOfItems: "",
    price: ""
  });

  const handleSaveOrder = () => {
    if (isFormComplete) {
      // Handle saving the order
      console.log("Order Saved:", formData);
      window.location.reload(); // Refresh the page
    }
  };

  // Update form data state when input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Check if all fields are filled
  const isFormComplete = Object.values(formData).every(value => value.trim() !== "");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch products from API
        const products = await fetchProducts();
        console.log("Fetched Products:", products); // Log the products to verify the data

        // Find the product by ID
        const product = products.find(p => p.id === productId);
        if (product) {
          setProductDetails({
            flavour: product.category.Name,
            product: product.Name,
            stock: product.Stock,
            unitPrice: product.price,
            img: product.Image.url
          });
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (!productDetails) {
    return <div>Loading product details...</div>;
  }

  return (
    <>
      <div className="w-[540px] text-[#fab12f] text-[32px] font-semibold font-['Poppins'] ml-8">
        Add<span className="text-black"> External Order</span>
      </div>

      <div className="mx-auto bg-white p-8 rounded-lg">
        <div className="flex items-center mb-8 border p-2 rounded-lg w-[226px] h-[74px]">
          <div className="bg-[#ececec] w-12 h-12 mr-2">
            <Image
              alt={productDetails.product}
              className="rounded-full mr-4"
              height={64}
              width={64}
              src={`http://146.190.245.42:1337${productDetails.img}`}
            />
          </div>
          <h1 className="text-[#3f6075] text-lg font-medium font-['Poppins'] capitalize">
            {productDetails.product}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
              Customer’s Name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-8"
              placeholder="Customer’s Name"
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
            />

            <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
              Customer’s Email
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-8"
              placeholder="Customer’s Email"
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleInputChange}
            />

            <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
              Shipping Address
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="Street Address"
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="City/Town"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="State/Province/Region"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />

            <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2 mt-8">
              Tracking Number
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Tracking Number"
              type="text"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
              Number Of Items
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-8"
              placeholder="Number of Items ordered"
              type="text"
              name="numberOfItems"
              value={formData.numberOfItems}
              onChange={handleInputChange}
            />

            <div className="relative">
              <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
                Price Of The Item
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  className="w-full p-3 pl-8 border border-gray-300 rounded-lg"
                  placeholder="Price of the product"
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-end mt-[320px]">
              <button
                onClick={handleSaveOrder}
                className={`w-60 h-[54px] p-2.5 rounded-[10px] justify-center items-center text-lg font-semibold font-['Poppins'] capitalize leading-[25.20px] flex items-center ${isFormComplete ? "bg-gradient-to-br from-[#ffe047] to-[#ffb200] text-black" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                disabled={!isFormComplete}
              >
                Save Order
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrder;
