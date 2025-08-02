import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* future pages */}
        </Routes>
      </div>
    </Router>
  );
}
