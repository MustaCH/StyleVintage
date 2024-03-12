import React from "react";
import { Sidebar, NavMobile } from "./components/shared/index";
import {
  Cart,
  Chat,
  Checkout,
  Confirmation,
  Declined,
  FAQS,
  Main,
  Pending,
  ProductCat,
  ProductDetail,
  ProductList,
} from "./screens/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartProvider from "./storage/cart-context";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Sidebar />
        <NavMobile />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/cat/:catid" element={<ProductCat />} />
          <Route path="/cat/:catid/:itemid" element={<ProductDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/declined" element={<Declined />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/FAQS" element={<FAQS />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
