import { Outlet, Route, Routes } from 'react-router-dom';
// XÓA DÒNG NÀY: import { BrowserRouter as Router } from 'react-router-dom';

// === Layouts & Components ===
import Footer from './components/Footer';
import Header from './components/Header';

// === Public Pages ===
import CartDashboard from './pages/CartDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import ProductViewDetail from './pages/ProductViewDetail';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import VoucherDashboard from './pages/VoucherDashboard';

// === Admin Pages ===
import AdminLayout from './pages/admin/AdminLayout';
import BrandAdmin from './pages/admin/BrandAdmin';
import CategoryAdmin from './pages/admin/CategoryAdmin';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import ProductAdmin from './pages/admin/ProductAdmin';
import ProductForm from './pages/admin/ProductForm';
import SizeForm from './pages/admin/SizeForm';
import UserAdmin from './pages/admin/UserAdmin';
import UserCreateForm from './pages/admin/UserCreateForm';
import UserForm from './pages/admin/UserForm';
import VariantAdmin from './pages/admin/VariantAdmin';
import VariantForm from './pages/admin/VariantForm';
import VoucherAdmin from './pages/admin/VoucherAdmin';

// === Info Footer Pages ===
import AboutPage from './pages/inforfooter/AboutPage';
import CareersPage from './pages/inforfooter/CareersPage';
import ContactPage from './pages/inforfooter/ContactPage';
import FAQPage from './pages/inforfooter/FAQPage';
import NewsPage from './pages/inforfooter/NewsPage';
import PaymentPage from './pages/inforfooter/PaymentPage';
import ReturnsPage from './pages/inforfooter/ReturnsPage';
import SecurityPage from './pages/inforfooter/SecurityPage';
import ShippingPage from './pages/inforfooter/ShippingPage';
import SizeGuidePage from './pages/inforfooter/SizeGuidePage';
import StoreSystemPage from './pages/inforfooter/StoreSystemPage';
import TermsPage from './pages/inforfooter/TermsPage';


/**
 * TẠO COMPONENT LAYOUT CHO PUBLIC
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
        // ❌ KHÔNG BAO BỌC Router Ở ĐÂY NỮA
        <Routes>
            
            {/* === PUBLIC ROUTES === */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="/promotions" element={<Home />} />
                <Route path="/best-sellers" element={<Home />} />
                <Route path="/sale" element={<Home />} />
                <Route path="/trending" element={<Home />} />

                {/* TRANG SẢN PHẨM */}
                <Route path="/collections/:slug" element={< ProductList />} />
                <Route path="/product/:identifier" element={< ProductViewDetail />} />

                {/* Routes voucher (user) */}
                <Route path="/vouchers" element={< VoucherDashboard />} />
                {/* Routes giỏ hàng */}
                <Route path="/cart" element={<CartDashboard />} />
                {/* UserProfile */}
                <Route path="/profile" element={<UserProfile />} />

                {/* Cột 1: Về Style Code */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/stores" element={<StoreSystemPage />} />
                <Route path="/news" element={<NewsPage />} />

                {/* Cột 2: Hỗ trợ */}
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/size-guide" element={<SizeGuidePage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/returns" element={<ReturnsPage />} />

                {/* Cột 3: Chính sách */}
                <Route path="/security" element={<SecurityPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* === ADMIN ROUTES === */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardAdmin />} /> 
                <Route path="dashboard" element={<DashboardAdmin />} /> 
                
                {/* Routes cho Sản phẩm */}
                <Route path="products" element={<ProductAdmin />} /> 
                <Route path="products/new" element={<ProductForm />} /> 
                <Route path="products/edit/:id" element={<ProductForm />} /> 
                
                {/* Routes category/brand/voucher admin */}
                <Route path="categories" element={<CategoryAdmin />} /> 
                <Route path="brands" element={<BrandAdmin />} /> 
                <Route path="vouchers" element={<VoucherAdmin />} /> 
                
                {/* ROUTES CHO COLOR VARIANT */}
                <Route path="variants" element={<VariantAdmin />} />
                <Route path="variants/new" element={<VariantForm />} /> 
                <Route path="variants/edit/:id" element={<VariantForm />} /> 

                {/* ROUTES CHO SIZE INVENTORY */}
                <Route path="sizes/new/:variantId" element={<SizeForm />} /> 
                <Route path="sizes/edit/:id" element={<SizeForm />} /> 
                
                {/* User Admin */}
                <Route path="users" element={<UserAdmin />} />
                <Route path="users/edit/:id" element={<UserForm />} />
                <Route path="users/new" element={<UserCreateForm />} />
            </Route>

            

        </Routes>
    );
}

export default App;