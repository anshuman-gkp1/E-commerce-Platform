import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productAPI, cartAPI } from "../utils/api";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getProduct(id);
      setProduct(response.data.product);
    } catch (error) {
      toast.error("Error fetching product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await cartAPI.addToCart({ productId: id, quantity });
      toast.success("Added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding to cart");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-lg text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-light rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-4">{product.description}</p>

          <div className="flex items-center gap-8 mb-8">
            <div>
              <p className="text-gray-600">Price</p>
              <p className="text-4xl font-bold text-primary">
                ₹{product.price}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Stock</p>
              <p className="text-2xl font-semibold text-green-600">
                {product.stock}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Category</p>
              <p className="text-xl font-semibold">{product.category}</p>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border border-gray-300 px-4 py-2 rounded hover:bg-light"
              >
                -
              </button>
              <span className="text-2xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="border border-gray-300 px-4 py-2 rounded hover:bg-light"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
