// frontend/src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const discount = product.discount || 0;
  const finalPrice = product.price * (1 - discount / 100);

  return (
    <Link to={`/product/${product.slug}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
        <div className="relative">
          <img
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
              Mới
            </span>
          )}
          {product.isBestseller && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
              Bán chạy
            </span>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-blue-600">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500 text-xs mb-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
            <span className="text-gray-600 ml-1">| Đã bán {product.sold || 0}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-red-600">
              {finalPrice.toLocaleString()}đ
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {product.price.toLocaleString()}đ
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">TP. Hồ Chí Minh</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;