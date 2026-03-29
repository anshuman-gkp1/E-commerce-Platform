import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  authLoading: !!localStorage.getItem("token"),
  setUser: (user) => set({ user, authLoading: false }),
  setAuthLoading: (authLoading) => set({ authLoading }),
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token, authLoading: true });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authLoading: false });
  },
}));

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart
        .map((item) => (item.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    })),
  clearCart: () => set({ cart: [] }),
}));
