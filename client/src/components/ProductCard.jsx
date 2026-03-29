import { Link, useNavigate } from "react-router-dom";
import { cartAPI } from "../utils/api";
import { useAuth } from "../hooks/useAuth";
import { useCartStore } from "../context/store";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const addToLocalCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      await cartAPI.addToCart({
        productId: product._id || product.id,
        quantity: 1,
      });
      addToLocalCart({
        id: product._id || product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      toast.success("Added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding to cart");
    }
  };

  const handleBuyNow = async () => {
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    try {
      await cartAPI.addToCart({
        productId: product._id || product.id,
        quantity: 1,
      });
      addToLocalCart({
        id: product._id || product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      navigate("/checkout");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to proceed to checkout",
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden h-full border border-gray-100">
      <Link to={`/product/${product._id || product.id}`} className="block">
        <div className="relative w-full h-52 bg-light overflow-hidden group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 bg-white/90 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product._id || product.id}`} className="block">
          <h3 className="font-semibold text-lg truncate hover:text-primary transition">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mt-1">
            {product.description}
          </p>
        </Link>

        <div className="flex justify-between items-center mt-4">
          <span className="text-primary font-bold text-xl">
            ₹{product.price}
          </span>
          {product.stock > 0 ? (
            <p className="text-green-600 text-sm font-semibold">In Stock</p>
          ) : (
            <p className="text-red-600 text-sm font-semibold">Out of Stock</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full border border-primary text-primary py-2 rounded-lg font-semibold hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={product.stock <= 0}
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
