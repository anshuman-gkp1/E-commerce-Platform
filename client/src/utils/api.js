import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getCurrentUser: () => api.get("/auth/me"),
  updateAddress: (data) => api.put("/auth/address", data),
};

// Product APIs
export const productAPI = {
  getProducts: (params) => api.get("/products", { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (data) => api.post("/products", data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

// Cart APIs
export const cartAPI = {
  getCart: () => api.get("/cart"),
  addToCart: (data) => api.post("/cart/add", data),
  removeFromCart: (data) => api.post("/cart/remove", data),
  updateCartQuantity: (data) => api.put("/cart/update", data),
  clearCart: () => api.delete("/cart/clear"),
};

// Order APIs
export const orderAPI = {
  createOrder: (data) => api.post("/orders", data),
  getOrder: (id) => api.get(`/orders/${id}`),
  getUserOrders: () => api.get("/orders/user"),
  getAllOrders: () => api.get("/orders/all"),
  updateOrderStatus: (id, data) => api.put(`/orders/${id}`, data),
};

export default api;
