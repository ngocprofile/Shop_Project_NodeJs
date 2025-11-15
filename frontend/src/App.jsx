import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

// === Layouts & Components ===
import Footer from './components/Footer';
import Header from './components/Header';

// === Public Pages ===
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';

// === Admin Pages (CÁC IMPORT MỚI) ===
import AdminLayout from './pages/admin/AdminLayout';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import ProductAdmin from './pages/admin/ProductAdmin';
import ProductForm from './pages/admin/ProductForm';
import UserAdmin from './pages/admin/UserAdmin';
import UserCreateForm from './pages/admin/UserCreateForm';
import UserForm from './pages/admin/UserForm';
// (Bạn có thể import thêm OrderAdmin, UserAdmin... ở đây)

/**
 * 2. TẠO COMPONENT LAYOUT CHO PUBLIC
 * Component này sẽ bọc tất cả các trang của khách hàng,
 * đảm bảo chúng luôn có Header và Footer.
 */
const PublicLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 py-5">
        <Outlet /> {/* Các trang public sẽ được render ở đây */}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      {/* 3. Đưa <Routes> ra ngoài cùng */}
      <Routes>
        
        {/* === 4. BỌC CÁC ROUTE PUBLIC BẰNG PUBLICLAYOUT === */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/promotions" element={<Home />} />
          <Route path="/best-sellers" element={<Home />} />
          <Route path="/sale" element={<Home />} />
          <Route path="/trending" element={<Home />} />

          {/* TRANG SẢN PHẨM */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<Products />} />
          <Route path="/category/:slug" element={<Products />} />
          
          {/* UserProfile */}
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        {/* === 5. BỌC CÁC ROUTE ADMIN BẰNG ADMINLAYOUT === */}
        {/* Layout này (có sidebar) sẽ áp dụng cho tất cả các route con */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} /> {/* /admin */}
          <Route path="dashboard" element={<DashboardAdmin />} /> {/* /admin/dashboard */}
          
          {/* Routes cho Sản phẩm */}
          <Route path="products" element={<ProductAdmin />} /> {/* /admin/products */}
          <Route path="products/new" element={<ProductForm />} /> {/* /admin/products/new */}
          <Route path="products/edit/:id" element={<ProductForm />} /> {/* /admin/products/edit/:id */}
          
          {/* (Thêm các route admin khác ở đây) */}
          {/* <Route path="orders" element={<OrderAdmin />} /> */}
          <Route path="users" element={<UserAdmin />} />
          <Route path="users/edit/:id" element={<UserForm />} />
          <Route path="users/new" element={<UserCreateForm />} />
        </Route>

        {/* (Tùy chọn: Thêm route 404 Not Found) */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}

      </Routes>
    </Router>
  );
}

export default App;