import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isHome, setIsHome] = useState(true); // State to track if user is on the home section

  useEffect(() => {
    const handleScroll = () => {
      // Detect scroll position
      const scrollPosition = window.scrollY;

      // Check if the user is at the top of the page (home section)
      if (scrollPosition < 80) {
        setIsHome(true); // Show header
      } else {
        setIsHome(false); // Hide header
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-around items-center z-50 px-6 py-2 shadow-md transition-transform duration-300 bg-blue-200">
      <div className="text-4xl font-bold text-blue-950">Spark Haven</div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex text-xs  font-semibold space-x-20">
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          className="text-gray-500 text-xl hover:text-black cursor-pointer"
        >
          Home
        </ScrollLink>

        <ScrollLink
          to="about"
          smooth={true}
          duration={500}
          className="text-gray-500 text-xl hover:text-black cursor-pointer"
        >
          About
        </ScrollLink>

        <ScrollLink
          to="contact"
          smooth={true}
          duration={500}
          className="text-gray-500 text-xl hover:text-black cursor-pointer"
        >
          Contact
        </ScrollLink>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-700 hover:text-blue-500"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
          <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            className="text-gray-500 text-xl hover:text-black cursor-pointer"
          >
            Home
          </ScrollLink>

          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="text-gray-500 text-xl hover:text-black cursor-pointer"
          >
            About
          </ScrollLink>

          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="text-gray-500 text-xl hover:text-black cursor-pointer"
          >
            Contact
          </ScrollLink>
        </div>
      )}

      {/* Log In Button */}
      <Link to="/auth/login" className="hidden md:block">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Log In
        </button>
      </Link>
    </header>
  );
};

export default Header;
