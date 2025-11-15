// frontend/src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 5000000],
    shipping: [],
    location: [],
    sort: "popular",
  });

  const { slug } = useParams();
  const categorySlug = slug || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams();

        if (categorySlug) query.append("category", categorySlug);
        if (filters.category.length > 0) query.append("subcategory", filters.category.join(","));
        query.append("priceMin", filters.priceRange[0]);
        query.append("priceMax", filters.priceRange[1]);
        if (filters.shipping.length > 0) query.append("shipping", filters.shipping.join(","));
        if (filters.location.length > 0) query.append("location", filters.location.join(","));
        query.append("sort", filters.sort);
        query.append("limit", 12);

        const [prodRes, catRes] = await Promise.all([
          API.get(`/products?${query.toString()}`),
          API.get("/categories"),
        ]);

        setProducts(prodRes.data);
        setTotal(prodRes.data.length);
        setCategories(catRes.data);
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters, categorySlug]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === "category" || type === "shipping" || type === "location") {
        const arr = prev[type];
        return {
          ...prev,
          [type]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
        };
      }
      return { ...prev, [type]: value };
    });
  };

  const resetFilters = () => {
    setFilters({
      category: [],
      priceRange: [0, 5000000],
      shipping: [],
      location: [],
      sort: "popular",
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* BREADCRUMB */}
      <nav className="text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-blue-600">Sản phẩm</Link>
        {categorySlug && (
          <>
            <span className="mx-2">/</span>
            <span className="capitalize">{categorySlug}</span>
          </>
        )}
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* SIDEBAR FILTER */}
        <aside className="lg:w-64 space-y-6">
          {/* Danh mục con */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-3">Danh mục</h3>
            {categories.find((c) => c.slug === categorySlug)?.subcategories?.map((sub) => (
              <label key={sub.slug} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category.includes(sub.slug)}
                  onChange={() => handleFilterChange("category", sub.slug)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm">{sub.name}</span>
                <span className="ml-auto text-gray-500">({sub.count})</span>
              </label>
            )) || <p className="text-gray-500 text-sm">Chưa có danh mục con</p>}
          </div>

          {/* Vận chuyển */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-3">Đơn vị vận chuyển</h3>
            {["Giao hàng nhanh", "Giao hàng tiết kiệm", "Giao hàng hỏa tốc"].map((ship) => (
              <label key={ship} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.shipping.includes(ship)}
                  onChange={() => handleFilterChange("shipping", ship)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm">{ship}</span>
              </label>
            ))}
          </div>

          {/* Nơi bán */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-3">Nơi bán</h3>
            {["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng"].map((loc) => (
              <label key={loc} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.location.includes(loc)}
                  onChange={() => handleFilterChange("location", loc)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm">{loc}</span>
                <span className="ml-auto text-gray-500">({Math.floor(Math.random() * 100)})</span>
              </label>
            ))}
          </div>

          {/* Khoảng giá */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-3">Khoảng giá</h3>
            <input
              type="range"
              min="0"
              max="5000000"
              step="100000"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({ ...filters, priceRange: [0, e.target.value] })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>0đ</span>
              <span>{filters.priceRange[1].toLocaleString()}đ</span>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <div>
              <h1 className="text-2xl font-bold capitalize">{categorySlug || "Tất cả sản phẩm"}</h1>
              <p className="text-gray-600">{total} sản phẩm</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label className="text-sm">Sắp xếp:</label>
              <select
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="popular">Phổ biến</option>
                <option value="newest">Mới nhất</option>
                <option value="price-low-high">Giá thấp → cao</option>
                <option value="price-high-low">Giá cao → thấp</option>
                <option value="bestselling">Bán chạy</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Không tìm thấy sản phẩm nào phù hợp.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;