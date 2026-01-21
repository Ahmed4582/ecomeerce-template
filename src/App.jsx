import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, lazy, Suspense } from "react";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./components/common/MainLayout";
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";

// Code Splitting - Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const EmailVerification = lazy(() => import("./pages/EmailVerification"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const HomeTwo = lazy(() => import("./pages/HomeTwo"));
const HomeThree = lazy(() => import("./pages/HomeThree"));
const HomeFour = lazy(() => import("./pages/HomeFour"));
const ProductOne = lazy(() => import("./pages/ProductOne"));
const Shop = lazy(() => import("./pages/Shop"));
const Pages = lazy(() => import("./pages/Pages"));
const Blogs = lazy(() => import("./pages/Blogs"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Cart = lazy(() => import("./pages/Cart"));
const Contact = lazy(() => import("./pages/Contact"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileOrders = lazy(() => import("./pages/ProfileOrders"));
const ProfileOrderDetail = lazy(() => import("./pages/ProfileOrderDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CategoryDetails = lazy(() => import("./pages/CategoryDetails"));
const Checkout = lazy(() => import("./pages/Checkout"));
const PaymentStatus = lazy(() => import("./pages/PaymentStatus"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminCategories = lazy(() => import("./pages/admin/AdminCategories"));
const AdminCategoryUpsert = lazy(() => import("./pages/admin/AdminCategoryUpsert"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminProductUpsert = lazy(() => import("./pages/admin/AdminProductUpsert"));
const AdminProductDetails = lazy(() => import("./pages/admin/AdminProductDetails"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminOrderDetails = lazy(() => import("./pages/admin/AdminOrderDetails"));
const AdminCustomers = lazy(() => import("./pages/admin/AdminCustomers"));
const AdminCustomerOrders = lazy(() => import("./pages/admin/AdminCustomerOrders"));
const AdminNotifications = lazy(() => import("./pages/admin/AdminNotifications"));
const AdminAttributes = lazy(() => import("./pages/admin/AdminAttributes"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-background-primary flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-text-secondary">Loading...</p>
    </div>
  </div>
);

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update HTML lang and dir attributes based on current language
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* ===== Auth Routes (NO Header/Footer) ===== */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/email-verification" element={<EmailVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forget-password" element={<ForgetPassword />} />

            {/* ===== Admin Routes (Admin Layout) ===== */}
            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/categories" element={<AdminCategories />} />
                <Route
                  path="/admin/categories/new"
                  element={<AdminCategoryUpsert />}
                />
                <Route
                  path="/admin/categories/:id/edit"
                  element={<AdminCategoryUpsert />}
                />

                <Route path="/admin/products" element={<AdminProducts />} />
                <Route
                  path="/admin/products/new"
                  element={<AdminProductUpsert />}
                />
                <Route
                  path="/admin/products/:id/edit"
                  element={<AdminProductUpsert />}
                />
                <Route
                  path="/admin/products/:id"
                  element={<AdminProductDetails />}
                />

                <Route path="/admin/attributes" element={<AdminAttributes />} />

                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />

                <Route path="/admin/customers" element={<AdminCustomers />} />
                <Route
                  path="/admin/customers/:id/orders"
                  element={<AdminCustomerOrders />}
                />

                <Route
                  path="/admin/notifications"
                  element={<AdminNotifications />}
                />
              </Route>
            </Route>

            {/* ===== App Routes (WITH Header/Footer) ===== */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/home-two" element={<HomeTwo />} />
              <Route path="/home-three" element={<HomeThree />} />
              <Route path="/home-four" element={<HomeFour />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/pages" element={<Pages />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/product/:id" element={<ProductOne />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/category/:id" element={<CategoryDetails />} />
              <Route path="/payment-status" element={<PaymentStatus />} />

              {/* ===== Protected Routes ===== */}
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/orders" element={<ProfileOrders />} />
                <Route
                  path="/profile/orders/:orderId"
                  element={<ProfileOrderDetail />}
                />
                <Route path="/track-order" element={<ProfileOrders />} />
              </Route>

              {/* ===== 404 (still uses layout) ===== */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
