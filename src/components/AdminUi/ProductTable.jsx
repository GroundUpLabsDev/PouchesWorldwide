"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Trash, Search, Plus } from 'lucide-react';

// Function to fetch products from the API
const fetchProducts = async () => {
  try {
    const res = await fetch('https://pouchesworldwide.com/strapi/api/products?populate=*');
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Function to update the retailers property using documentId
const updateRetailers = async (documentId, retailers) => {
  try {
    const res = await fetch(`https://pouchesworldwide.com/strapi/api/products/${documentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: { retailers } }),
    });

    if (!res.ok) {
      throw new Error('Failed to update product');
    }

    const updatedProduct = await res.json();
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
};

const ProductTable = ({ onCreateOrderClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [toggleStates, setToggleStates] = useState({});

  // Fetch API data on component mount
  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setData(products);

      // Initialize toggle states based on the retailers property
      const initialToggles = products.reduce((acc, product) => {
        acc[product.documentId] = product.retailers || false; // Use documentId as the key
        return acc;
      }, {});
      setToggleStates(initialToggles);
    };
    loadProducts();
  }, []);

  // Toggle function
  const handleToggle = async (documentId) => {
    const newToggleState = !toggleStates[documentId];
    setToggleStates((prevStates) => ({
      ...prevStates,
      [documentId]: newToggleState,
    }));

    // Send PUT request to update the retailers property using documentId
    const updatedProduct = await updateRetailers(documentId, newToggleState);
    if (updatedProduct) {
      console.log('Product updated successfully:', updatedProduct);
    }
  };

  // Map API data properties to match table fields
  const mappedData = data.map((item) => ({
    id: item.id,
    documentId: item.documentId, // Ensure documentId is included
    product: item.Name?.trim() || "No Name",
    flavour: item.category?.Name?.trim() || "Uncategorized",
    stock: item.Stock,
    unitPrice: item.price,
    img: item.Image?.formats?.medium?.url,
    retailers: item.retailers || false, // Ensure retailers property is included
  }));

  // Filter data based on search term on product name
  const filteredData = mappedData.filter((item) =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group rows by flavour (category name)
  const flavourCounts = filteredData.reduce((acc, item) => {
    acc[item.flavour] = (acc[item.flavour] || 0) + 1;
    return acc;
  }, {});

  // Delete functionality
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://pouchesworldwide.com/strapi/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete product');
      }

      // Re-fetch products after deletion
      const products = await fetchProducts();
      setData(products);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <div className="w-[933px] h-[90px] p-2.5 flex items-center justify-between border border-gray-300 mx-auto rounded-[5px] mb-12">
        <span className="text-[#2f4858] text-xl font-medium font-['Poppins'] capitalize">
          Add New Product To Your Collection
        </span>
        <Link href="/admin/Products/Details" passHref>
          <button className="bg-teal-600 h-[70px] font-semibold text-white px-4 py-2 rounded flex items-center gap-2">
            Add New Product <Plus className="w-5 h-5" />
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table rounded-t-lg overflow-hidden">
          <thead className="h-[51px] bg-[#f5d061] text-black text-lg font-['Inter'] capitalize">
            <tr>
              <th>Flavour</th>
              <th style={{ width: "150px" }}>Product</th>
              <th className="relative" style={{ width: "350px" }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Here..."
                  className="w-full h-[39px] bg-white/30 rounded-[8px] px-10 py-2 text-black border border-white placeholder-black text-lg font-light"
                />
                <div className="absolute top-1/2 left-6 transform -translate-y-1/2 text-black">
                  <Search size={20} />
                </div>
              </th>
              <th>Unit Price</th>
              <th>Stock</th>
              <th>Retailer Mode</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(flavourCounts).map(([flavour, count]) => {
              const flavourRows = filteredData.filter(item => item.flavour === flavour);
              return flavourRows.map((row, index) => (
                <tr key={row.id} className={index < count - 1 ? "border-b-0" : ""}>
                  {index === 0 && (
                    <td
                      rowSpan={count}
                      className="text-lg font-medium font-['Poppins'] capitalize text-center"
                      style={{ width: "150px" }}
                    >
                      {row.flavour}
                    </td>
                  )}
                  <td style={{ width: "250px" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded overflow-hidden bg-[#ececec]">
                        <img
                          src={`https://pouchesworldwide.com/strapi${row.img}`}
                          alt={row.product}
                          className="w-[64px] h-[64px] object-cover"
                        />
                      </div>
                      <Link href={`/admin/Products/Edit?ProductID=${row.id}`} passHref>
                        <div className="text-[#3f6075] text-lg font-medium font-['Poppins'] capitalize cursor-pointer">
                          {row.product}
                        </div>
                      </Link>
                    </div>
                  </td>
                  <td style={{ width: "150px" }}></td>
                  <td className="text-lg font-medium font-['Poppins'] capitalize" style={{ width: "150px" }}>
                    {row.unitPrice}
                  </td>
                  <td className="text-lg font-medium font-['Poppins'] capitalize" style={{ width: "100px" }}>
                    {row.stock}
                  </td>
                  <td style={{ width: "150px" }}>
                    {/* Toggle Button */}
                    <button
                      onClick={() => handleToggle(row.documentId)} // Use documentId here
                      className={`px-4 py-2 rounded ${
                        toggleStates[row.documentId] ? "bg-green-500" : "bg-gray-500"
                      } text-white`}
                    >
                      {toggleStates[row.documentId] ? "ON" : "OFF"}
                    </button>
                  </td>
                  <td style={{ width: "150px" }}>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="bg-red-600 text-white p-2 rounded"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductTable;