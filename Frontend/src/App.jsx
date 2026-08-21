
import React from "react";
import "./App.css";

import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right side */}
      <Navbar />

    </div>
  );
}

export default App;

