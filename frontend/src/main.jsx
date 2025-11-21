import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import Router
import App from './App.jsx';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter bọc toàn bộ App để quản lý routing */}
    <BrowserRouter>
      {/* CartProvider bọc App để Header và các trang khác có thể sử dụng useCart() */}
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);