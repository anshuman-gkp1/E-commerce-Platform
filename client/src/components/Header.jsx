import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCartStore } from "../context/store";

export default function Header() {
  const { user, logout } = useAuth();
  const cart = useCartStore((state) => state.cart);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-dark text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          ShopHub
        </Link>

        <nav className="flex items-center gap-8">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-primary transition">
            Products
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin" className="hover:text-primary transition">
              Admin
            </Link>
          )}

          <Link to="/cart" className="relative hover:text-primary transition">
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">{user.name}</span>
              <Link to="/orders" className="hover:text-primary transition">
                Orders
              </Link>
              <button
                onClick={handleLogout}
                className="bg-primary px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="bg-primary px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-primary px-4 py-2 rounded hover:bg-primary transition"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
