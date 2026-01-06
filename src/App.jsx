import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, lazy, Suspense } from "react";
import { CartProvider, CurrencyProvider, UserProvider } from "./context";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Code Splitting - Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const EmailVerification = lazy(() => import("./pages/EmailVerification"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const HomeTwo = lazy(() => import("./pages/HomeTwo"));
const HomeThree = lazy(() => import("./pages/HomeThree"));
const HomeFour = lazy(() => import("./pages/HomeFour"));
const ProductOne = lazy(() => import("./pages/ProductOne"));
const Cart = lazy(() => import("./pages/Cart"));
const Contact = lazy(() => import("./pages/Contact"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileOrders = lazy(() => import("./pages/ProfileOrders"));
const ProfileOrderDetail = lazy(() => import("./pages/ProfileOrderDetail"));

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
      <CurrencyProvider>
        <CartProvider>
          <UserProvider>
            <Router>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/home-two" element={<HomeTwo />} />
                  <Route path="/home-three" element={<HomeThree />} />
                  <Route path="/home-four" element={<HomeFour />} />
                  <Route path="/product-one" element={<ProductOne />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/orders" element={<ProfileOrders />} />
                  <Route
                    path="/profile/orders/:orderId"
                    element={<ProfileOrderDetail />}
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route
                    path="/email-verification"
                    element={<EmailVerification />}
                  />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/forget-password" element={<ResetPassword />} />
                  <Route path="/track-order" element={<ProfileOrders />} />
                </Routes>
              </Suspense>
            </Router>
          </UserProvider>
        </CartProvider>
      </CurrencyProvider>
    </ErrorBoundary>
  );
}

export default App;
