import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],
  customOrders: [],

  // Add custom order
  addCustomOrder: (order) =>
    set((state) => ({
      customOrders: [...state.customOrders, order],
    })),

  // Remove custom order
  removeCustomOrder: (orderId) =>
    set((state) => ({
      customOrders: state.customOrders.filter((order) => order.id !== orderId),
    })),

  // Add to cart: Group items by strength
  addToCart: (product) =>
    set((state) => {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id && item.strength === product.strength
      );

      if (existingProductIndex >= 0) {
        // If it exists, update the quantity
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].count += product.count;
        return { cart: updatedCart };
      } else {
        // If it doesn't exist, add it as a new order
        return { cart: [...state.cart, product] };
      }
    }),

  // Remove from cart: Use product ID and strength to uniquely identify an item
  removeFromCart: (productId, strength) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.id === productId && item.strength === strength)
      ),
    })),

  // Update quantity for a specific product variant
  updateQuantity: (productId, strength, newQuantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.strength === strength
          ? { ...item, count: newQuantity }
          : item
      ),
    })),

  // Increase quantity for a specific product variant
  increaseQuantity: (productId, strength) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.strength === strength
          ? { ...item, count: item.count + 1 }
          : item
      ),
    })),

  // Decrease quantity for a specific product variant, keeping minimum quantity as 1
  decreaseQuantity: (productId, strength) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.strength === strength && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      ),
    })),

  // Calculate total number of unique items in the cart
  getTotalItems: () => {
    const cart = get().cart;
    return cart.length; // Count the number of unique items
  },
}));

export default useCartStore;