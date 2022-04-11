import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./pages/detail/ProductDetail";
import Home from "./pages/home/Home";


function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const bodyElement = document.querySelector('body')
    bodyElement.className = darkMode ? "darkmode-bg" : ""
  }, [darkMode])
  
  return (
    <Router>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path='/' element={<Home darkMode={darkMode} />} />
        <Route path='/product/:productId' element={<ProductDetail darkMode={darkMode} />} />
        <Route path='/cart' element={<Cart darkMode={darkMode} />} />
      </Routes>
    </Router>
  )
}

export default App;
