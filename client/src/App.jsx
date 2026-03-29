import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import { useAuthStore } from "./context/store";
import { authAPI } from "./utils/api";

function App() {
  const { token, setUser, logout, setAuthLoading } = useAuthStore();

  useEffect(() => {
    const loadCurrentUser = async () => {
      if (!token) {
        setUser(null);
        setAuthLoading(false);
        return;
      }

      try {
        setAuthLoading(true);
        const response = await authAPI.getCurrentUser();
        setUser(response.data.user);
      } catch (error) {
        logout();
      } finally {
        setAuthLoading(false);
      }
    };

    loadCurrentUser();
  }, [token, setUser, logout, setAuthLoading]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-light">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
