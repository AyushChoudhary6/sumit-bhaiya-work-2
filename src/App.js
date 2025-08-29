// App.js (temporary debug version)
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import FreeQueryWidget from "./components/FreeQueryWidget"; // COMMENTED
import FreeTools from "./components/FreeTools";
import CourtroomSimulatorDemo from "./components/CourtroomSimulatorDemo"; // COMMENTED
import RoleGateway from "./components/RoleGateway"; // COMMENTED
// import KidsCorner from "./components/KidsCorner"; // COMMENTED
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        {<FreeQueryWidget /> }
       { <FreeTools />}
       { <Features />}
        { <CourtroomSimulatorDemo /> }
        { <RoleGateway /> }
        {/* { <KidsCorner /> } */}
      { <Pricing />}
       { <Testimonials />}
      </main>
      <Footer />
    </>
  );
}

export default App;