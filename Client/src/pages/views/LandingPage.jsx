import About from "@/components/landing-page/About";
import Footer from "@/components/landing-page/Footer.";
import Contact from "@/components/landing-page/Contact";
import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
