import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  customOrders: [],

  addCustomOrder: (order) =>
    set((state) => ({
      customOrders: [...state.customOrders, order]
    })),

  removeCustomOrder: (orderId) =>
    set((state) => ({
      customOrders: state.customOrders.filter(order => order.id !== orderId)
    })),

  // Updated addToCart: Treat same product with different selectedCans as separate items.
  addToCart: (product) =>
    set((state) => {
      // Check if an entry with the same product id and selectedCans exists.
      const existingProduct = state.cart.find(
        (item) =>
          item.id === product.id && item.selectedCans === product.selectedCans
      );

      if (existingProduct) {
        // Increase the quantity of the existing product.
        return {
          cart: state.cart.map((item) =>
            item.id === product.id && item.selectedCans === product.selectedCans
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        // Add the product as a new entry with quantity 1.
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    }),

  // Remove from cart using both product id and selectedCans to uniquely identify an item.
  removeFromCart: (productId, selectedCans) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.id === productId && item.selectedCans === selectedCans)
      )
    })),

  // Increase quantity for a specific product variant.
  increaseQuantity: (productId, selectedCans) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.selectedCans === selectedCans
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    })),

  // Decrease quantity for a specific product variant, keeping minimum quantity as 1.
  decreaseQuantity: (productId, selectedCans) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId &&
        item.selectedCans === selectedCans &&
        item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    }))
}));

export default useCartStore;