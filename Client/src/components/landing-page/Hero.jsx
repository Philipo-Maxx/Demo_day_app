import React from "react";
import { Link } from "react-router-dom";
import ring from "../../assets/Blue-Sapphire.jpeg";
import { Element } from "react-scroll";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  return (
    <Element name="home">
      <section className="bg-gradient-to-b from-blue-300 to-white text-center flex flex-col md:flex-row pt-28 px-4 justify-around items-center md:items-start">
        <div className="max-w-3xl mx-auto text-left mb-6 md:mb-0">
          <h1 className="text-4xl sm:text-5xl font-serif text-gray-800">
            Welcome to Spark Haven
          </h1>
          <h2 className="mt-6 pb-10 text-2xl sm:text-3xl font-serif text-blue-700">
            <i>
              Your ultimate destination for exquisite jewelry that adds a touch
              of sparkle to your life.
            </i>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-justify leading-relaxed">
            We believe that jewelry is more than just an accessory—it’s a
            reflection of your unique style, a celebration of special moments,
            and a cherished part of your story.
          </p>
          <p className="mt-2 text-sm sm:text-base text-justify leading-relaxed">
            Explore our collection and find the perfect sparkle to complement
            your unique style.
          </p>
          <div className="flex">
            <Link to="/auth/login">
              <button className="mt-6 px-6 py-2 flex gap-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Get Started{" "}
                <span className="pt-1.5">
                  <FiArrowRight />
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <img
          src={ring} // Use the imported image
          alt="Product showcase"
          className="w-1/2 h-50 sm:w-2/3 md:w-1/3 max-w-xs rounded-full border-rounded-full  pb-5"
        />
      </section>
    </Element>
  );
};

export default Hero;
