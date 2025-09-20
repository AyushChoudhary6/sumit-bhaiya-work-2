import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import FreeQueryWidget from "./components/FreeQueryWidget";
import FreeTools from "./components/FreeTools";
import CourtroomSimulatorDemo from "./components/CourtroomSimulatorDemo";
import RoleGateway from "./components/RoleGateway";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import "./App.css";

// Home component that contains all your main page content
const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <FreeQueryWidget />
      <FreeTools />
      <Features />
      <CourtroomSimulatorDemo />
      <RoleGateway />
      <Pricing />
      <Testimonials />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
