import {sendGetRequest} from "@/_config/apiConfig";

export async function fetchProducts(userRole) {
  let products = [];
  let page = 1;
  let pageSize = 50; // Start with 50
  let totalProducts = 0;

  try {
    // Step 1: Fetch the total product count
    const initialRes = await fetch(
      `https://pouchesworldwide.com/strapi/api/products?pagination[page]=1&pagination[pageSize]=1`
    );

    if (!initialRes.ok) {
      throw new Error("Failed to fetch product count");
    }

    const initialData = await initialRes.json();
    totalProducts = initialData.meta.pagination.total;

    console.log(`Total Products: ${totalProducts}`);

    // Adjust pageSize dynamically (Strapi max limit is 100)
    pageSize = Math.min(totalProducts, 100);

    // Step 2: Fetch all products in pages
    do {
      const res = await fetch(
        `https://pouchesworldwide.com/strapi/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch products on page ${page}`);
      }

      const data = await res.json();
      products.push(...data.data); // Merge products

      page++;
    } while (products.length < totalProducts);

  } catch (error) {
    console.error(error);
  }

  return products; // ✅ Always returns a products array (even if empty)
}

export async  function fetchProduct({productId}) {
  try {
    const data = await sendGetRequest('/products', {populate: "*", 'filters[user][id][$eq]': userId});
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }

}