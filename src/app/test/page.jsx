"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAllProducts } from "@/app/utils/product"; // Import the utility function

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Hook for navigation

  // Fetch data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await fetchAllProducts(); // Use the utility function
        setProducts(productsData); // Set the fetched products
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Display loading state
  if (loading) {
    return <div>Loading products...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <div>
        {products.map((product) => (
          <div key={product.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
            <h2>{product.Name}</h2>
            <p>
              <strong>Brand:</strong> {product.brand.name}
            </p>
            <p>
              <strong>Flavor:</strong> {product.flavor.name}
            </p>
            <p>
              <strong>Variants:</strong>
            </p>
            <ul>
              {product.variant.length > 0 ? (
                product.variant.map((variant) => (
                  <li key={variant.id}>
                    <p>
                      <strong>Variant ID:</strong> {variant.id}
                    </p>
                    <button
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        margin: "5px 0",
                      }}
                      onClick={() => router.push(`/product/${variant.product.id}`)} // Navigate to product details
                    >
                      Strength: {variant.strength.name}
                    </button>
                    <p>
                      <strong>Product ID:</strong> {variant.product.id}
                    </p>
                  </li>
                ))
              ) : (
                <li>No variants available</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
