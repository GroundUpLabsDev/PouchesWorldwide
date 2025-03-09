export const getUserRole = () => {
  if (typeof window !== "undefined") {
      try {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
              const parsedUser = JSON.parse(storedUser);
              return parsedUser?.urole || "guest"; // Default role: guest
          }
      } catch (error) {
          console.error("Error fetching user role:", error);
      }
  }
  return "guest"; // Default role if not found
};

export async function fetchProducts() {
  const userRole = getUserRole(); // Automatically get the role

  const res = await fetch("https://pouchesworldwide.com/strapi/api/products?populate=*");

  if (!res.ok) {
      throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  let products = data.data || []; // Ensure it returns an empty array if no data found

  // If the user is not an admin or wholesaler, filter out products where retailers is false
  if (userRole !== "wholesaler" && userRole !== "admin") {
      products = products.filter(product => product.retailers !== false);
  }

  return products;
}
