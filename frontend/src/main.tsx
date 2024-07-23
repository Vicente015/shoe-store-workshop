import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.tsx';
import { ProductDetailsPage } from './pages/ProductDetails.tsx';
import { Cart } from './pages/Cart.tsx';
import { Login } from './pages/Login.tsx';
import { UserProvider } from './context/user.tsx';
import { CartProvider } from './context/cart.tsx';
import { PaymentPage } from './pages/Payment.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/product/:slug',
    element: <ProductDetailsPage />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/payment',
    element: <PaymentPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
