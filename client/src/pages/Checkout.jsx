import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, cartAPI, orderAPI } from "../utils/api";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Checkout() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(null);
  const [formData, setFormData] = useState({
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    postalCode: user?.address?.postalCode || "",
    country: user?.address?.country || "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [token]);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCart(response.data.cart);
    } catch (error) {
      toast.error("Error fetching cart");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode ||
      !formData.country
    ) {
      toast.error("Please fill in all address fields");
      return;
    }

    try {
      setLoading(true);

      // Create order
      const orderResponse = await orderAPI.createOrder({
        shippingAddress: formData,
      });

      // Update user address
      await authAPI.updateAddress(formData);

      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error placing order");
    } finally {
      setLoading(false);
    }
  };

  if (!cart) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (cart.items.length === 0) {
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
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={handleChange}
                  className="md:col-span-2 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary"
                />

                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary"
                />

                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 transition"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        <div className="bg-light rounded-lg p-6 h-fit shadow">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 border-b border-gray-300 pb-4 mb-4">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-4">
            <p className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{total}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping:</span>
              <span>₹0 (Free)</span>
            </p>
            <p className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Total:</span>
              <span>₹{total}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
