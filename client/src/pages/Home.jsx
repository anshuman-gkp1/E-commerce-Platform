import { useEffect, useState } from "react";
import { productAPI } from "../utils/api";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    search: "",
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProducts({
        category: filters.category || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        search: filters.search || undefined,
        limit: 12,
      });
      setProducts(response.data.products);
    } catch (error) {
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to ShopHub</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-light p-4 rounded">
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          value={filters.search}
          onChange={handleFilterChange}
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary"
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Home">Home</option>
          <option value="Sports">Sports</option>
          <option value="Beauty">Beauty</option>
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary"
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary"
        />
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
