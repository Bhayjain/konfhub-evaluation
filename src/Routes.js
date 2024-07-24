// src/Routes.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import CategoryList from "./components/Checkout/checkout";
// import Navbar from "./components/Navbar";

const AppRoutes = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CategoryList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
