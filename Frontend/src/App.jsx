import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/about";
import Prediction from "./pages/prediction"
import Analytics from "./pages/analytics";
import Trending from "./pages/trending";
import Community from "./pages/community";
import Profile from "./pages/profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/prediction" element={<Prediction />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/community" element={<Community />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;