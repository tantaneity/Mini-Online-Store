import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import { Header } from './components/layout/Header';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { AdminRoute } from './components/auth/AdminRoute';
import { ProductList } from './components/products/ProductList';
import { ProductDetails } from './components/products/ProductDetails';
import { Cart } from './components/cart/Cart';
import { Checkout } from './components/order/Checkout';
import { OrderList } from './components/order/OrderList';
import { AdminPanel } from './components/admin/AdminPanel';
import { useAuthStore } from './stores/auth.store';

export default function App() {
  const { token, fetchCurrentUser } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    }
  }, [token, fetchCurrentUser]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            
            <Route element={<PrivateRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<OrderList />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
          </Routes>
        </main>

        <CookieConsent
          location="bottom"
          buttonText="Accept All Cookies"
          declineButtonText="Decline"
          enableDeclineButton
          cookieName="miniStoreConsent"
          style={{
            background: '#1f2937',
            padding: '20px',
            alignItems: 'center',
          }}
          buttonStyle={{
            background: '#10b981',
            color: 'white',
            fontSize: '14px',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: '500',
          }}
          declineButtonStyle={{
            background: '#6b7280',
            color: 'white',
            fontSize: '14px',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: '500',
          }}
          expires={365}
          onAccept={() => {
            console.log('Cookies accepted');
          }}
          onDecline={() => {
            console.log('Cookies declined');
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="text-white text-sm">
              This website uses cookies to enhance user experience and analyze site traffic. 
              By clicking "Accept All Cookies", you consent to our use of cookies.{' '}
              <a 
                href="/privacy-policy" 
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                Learn more in our Privacy Policy
              </a>
            </span>
          </div>
        </CookieConsent>
      </div>
    </BrowserRouter>
  );
}

