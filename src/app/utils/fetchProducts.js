

// utils/fetchProducts.js
export async function fetchProducts() {
    const res = await fetch("http://146.190.245.42:1337/api/products?populate=*");
  
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
  
    const data = await res.json();
    return data.data || []; // Ensure it returns an empty array if no data found
  }
  