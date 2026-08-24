import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/about";
import Analytics from "./pages/analytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}

export default App;