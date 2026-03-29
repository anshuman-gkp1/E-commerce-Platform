import { useEffect, useState } from "react";
import { productAPI, orderAPI } from "../utils/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Admin() {
  const navigate = useNavigate();
  const { user, token, authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Electronics",
    image: "",
    stock: "",
  });

  useEffect(() => {
    if (authLoading) return;

    if (!token || user?.role !== "admin") {
      navigate("/");
      return;
    }
    loadDashboard();
  }, [token, user, authLoading, navigate]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [productsRes, ordersRes] = await Promise.all([
        productAPI.getProducts({ limit: 100 }),
        orderAPI.getAllOrders(),
      ]);

      setProducts(productsRes.data.products);
      setOrders(ordersRes.data.orders);

      // Calculate stats
      const totalRevenue = ordersRes.data.orders.reduce(
        (sum, order) => sum + order.totalAmount,
        0,
      );
      setStats({
        totalProducts: productsRes.data.products.length,
        totalOrders: ordersRes.data.orders.length,
        totalRevenue,
        totalUsers: ordersRes.data.orders.length,
      });
    } catch (error) {
      toast.error("Error loading dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await productAPI.createProduct(newProduct);
      toast.success("Product added successfully");
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "Electronics",
        image: "",
        stock: "",
      });
      loadDashboard();
    } catch (error) {
      toast.error("Error adding product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await productAPI.deleteProduct(id);
        toast.success("Product deleted");
        loadDashboard();
      } catch (error) {
        toast.error("Error deleting product");
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateOrderStatus(orderId, {
        status: newStatus,
        paymentStatus: "paid",
      });
      toast.success("Order updated");
      loadDashboard();
    } catch (error) {
      toast.error("Error updating order");
    }
  };

  if (loading && !stats) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 font-semibold ${activeTab === "dashboard" ? "border-b-2 border-primary text-primary" : "text-gray-600"}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 font-semibold ${activeTab === "products" ? "border-b-2 border-primary text-primary" : "text-gray-600"}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 font-semibold ${activeTab === "orders" ? "border-b-2 border-primary text-primary" : "text-gray-600"}`}
        >
          Orders
        </button>
      </div>

      {activeTab === "dashboard" && stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Products</p>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Orders</p>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-primary">
              ₹{stats.totalRevenue}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>
        </div>
      )}

      {activeTab === "products" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Product List</h2>
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-600 text-sm">
                      ₹{product.price} | Stock: {product.stock}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <form
              onSubmit={handleAddProduct}
              className="bg-white rounded-lg shadow p-4 space-y-3"
            >
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
                required
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
                rows="3"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
                required
              />
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
              >
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home">Home</option>
                <option value="Sports">Sports</option>
                <option value="Beauty">Beauty</option>
              </select>
              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-red-600"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Orders</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-gray-600 text-sm">Order ID</p>
                    <p className="font-semibold">{order._id.substring(0, 8)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total</p>
                    <p className="font-semibold">₹{order.totalAmount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleUpdateOrderStatus(order._id, e.target.value)
                      }
                      className="border border-gray-300 px-2 py-1 rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
