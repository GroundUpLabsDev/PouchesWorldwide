import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  customOrders: [], // Add this for custom orders

  customOrders: [],
  addCustomOrder: (order) => set((state) => ({ customOrders: [...state.customOrders, order] })),
  removeCustomOrder: (orderId) => set((state) => ({
    customOrders: state.customOrders.filter(order => order.id !== orderId)
  })),
  
  addCustomOrder: (order) => 
    set((state) => ({
      customOrders: [...state.customOrders, order]
    })),

  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  increaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decreaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
}));


export default useCartStore;
