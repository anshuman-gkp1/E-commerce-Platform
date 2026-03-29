import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartAPI } from "../utils/api";
import { useCartStore } from "../context/store";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Cart() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [token, navigate]);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCart(response.data.cart);
    } catch (error) {
      toast.error("Error fetching cart");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await cartAPI.removeFromCart({ productId });
      setCart((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.product._id !== productId),
      }));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Error removing item");
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      await cartAPI.updateCartQuantity({ productId, quantity });
      setCart((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item,
        ),
      }));
    } catch (error) {
      toast.error("Error updating quantity");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="flex gap-4 bg-white rounded-lg shadow p-4 mb-4"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.product.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.product._id, item.quantity - 1)
                    }
                    className="px-3 py-1 hover:bg-light"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.product._id, item.quantity + 1)
                    }
                    className="px-3 py-1 hover:bg-light"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold w-20">
                  ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() => handleRemoveItem(item.product._id)}
                  className="text-red-600 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-light rounded-lg p-6 h-fit shadow">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 border-b border-gray-300 pb-4 mb-4">
            <p className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{total}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping:</span>
              <span>₹0 (Free)</span>
            </p>
            <p className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>₹{total}</span>
            </p>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-3 border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
