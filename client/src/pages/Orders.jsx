import { useEffect, useState } from "react";
import { orderAPI } from "../utils/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Orders() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getUserOrders();
      setOrders(response.data.orders);
    } catch (error) {
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-lg text-gray-600 mb-4">You have no orders yet</p>
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-gray-600 text-sm">Order ID</p>
                <p className="font-semibold">{order._id.substring(0, 8)}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Date</p>
                <p className="font-semibold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total</p>
                <p className="font-semibold text-primary">
                  ₹{order.totalAmount}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="font-semibold mb-2">Items:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {order.products.map((item, index) => {
                  const productName =
                    item.product?.name || "Product unavailable";
                  const productKey =
                    item.product?._id || `${order._id}-${index}`;

                  return (
                    <li key={productKey}>
                      {productName} x {item.quantity} - ₹
                      {item.price * item.quantity}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
