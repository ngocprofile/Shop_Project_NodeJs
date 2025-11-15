// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import API from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: false,
  fade: true,
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [discounted, setDiscounted] = useState([]);
  const [mostSearched, setMostSearched] = useState([]);

  const promotions = [
    {
      id: 1,
      title: "GIẢM 50% TOÀN BỘ",
      subtitle: "Chỉ từ 07-09/11/2025",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=600&fit=crop",
    },
    {
      id: 2,
      title: "FREESHIP ĐƠN TỪ 300K",
      subtitle: "Áp dụng toàn quốc",
      image: "https://images.unsplash.com/photo-1607083206869-4c7675e2d7b2?w=1600&h=600&fit=crop",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // GỌI API ĐÚNG VỚI BACKEND (DỰA TRÊN ROUTES BẠN ĐÃ TẠO)
        const [catRes, bestRes, discRes, searchRes] = await Promise.all([
          API.get("/categories"),                    // OK
          API.get("/products?sort=sold&limit=8"),    // BÁN CHẠY → sort theo sold
          API.get("/products?discount>0&limit=8"),   // GIẢM GIÁ → có discount
          API.get("/products?sort=searchCount&limit=8"), // TÌM KIẾM NHIỀU → sort searchCount
        ]);

        setCategories(catRes.data.slice(0, 6));
        setBestSellers(bestRes.data);
        setDiscounted(discRes.data);
        setMostSearched(searchRes.data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* HERO SLIDER */}
      <section className="mb-5">
        <Slider {...sliderSettings}>
          {promotions.map((p) => (
            <div key={p.id} className="position-relative">
              <img
                src={p.image}
                alt={p.title}
                className="w-100"
                style={{ height: "500px", objectFit: "cover" }}
              />
              <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                <h1 className="display-4 fw-bold">{p.title}</h1>
                <p className="fs-5">{p.subtitle}</p>
                <Link to="/sale" className="btn btn-light btn-lg mt-3">
                  Mua ngay
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* DANH MỤC */}
      <section className="container mb-5">
        <h2 className="text-center mb-4 fw-bold">Danh Mục Nổi Bật</h2>
        <div className="row g-4">
          {categories.map((cat) => (
            <div key={cat._id} className="col-6 col-md-4 col-lg-2">
              <Link to={`/category/${cat.slug}`} className="text-decoration-none">
                <div className="card border-0 shadow-sm overflow-hidden">
                  <img
                    src={cat.image || "/placeholder.jpg"}
                    className="card-img-top"
                    alt={cat.name}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center p-3">
                    <h6 className="card-title mb-0">{cat.name}</h6>
                    <small className="text-muted">0 sp</small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* BÁN CHẠY */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Sản Phẩm Bán Chạy</h2>
            <Link to="/best-sellers" className="text-primary">
              Xem tất cả →
            </Link>
          </div>
          <div className="row g-4">
            {bestSellers.map((p) => (
              <div key={p._id} className="col-6 col-md-4 col-lg-3">
                <ProductCard product={p} showRating />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIẢM GIÁ */}
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-danger">Khuyến Mãi Hot</h2>
          <Link to="/sale" className="text-danger">
            Xem tất cả →
          </Link>
        </div>
        <div className="row g-4">
          {discounted.map((p) => (
            <div key={p._id} className="col-6 col-md-4 col-lg-3">
              <ProductCard product={p} showDiscount highlight />
            </div>
          ))}
        </div>
      </section>

      {/* TÌM KIẾM NHIỀU */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Được Tìm Kiếm Nhiều</h2>
            <Link to="/trending" className="text-purple">
              Xem tất cả →
            </Link>
          </div>
          <div className="row g-4">
            {mostSearched.map((p) => (
              <div key={p._id} className="col-6 col-md-4 col-lg-3">
                <ProductCard product={p} badge="HOT" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;