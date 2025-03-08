

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
  