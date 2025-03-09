"use client";
import { useState } from "react";

export default function CreateOrderForm() {
  const [formData, setFormData] = useState({
    product: "",
    customerName: "",
    email: "",
    address: "",
    quantity: 1,
    price: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted:", formData);
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <input type="text" name="product" placeholder="Product Name" onChange={handleChange} className="border p-2 w-full mb-2"/>
      <input type="text" name="customerName" placeholder="Customer Name" onChange={handleChange} className="border p-2 w-full mb-2"/>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2"/>
      <input type="text" name="address" placeholder="Shipping Address" onChange={handleChange} className="border p-2 w-full mb-2"/>
      <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} className="border p-2 w-full mb-2"/>
      <input type="number" name="price" placeholder="Price" onChange={handleChange} className="border p-2 w-full mb-2"/>
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Save Order</button>
    </form>
  );
}
