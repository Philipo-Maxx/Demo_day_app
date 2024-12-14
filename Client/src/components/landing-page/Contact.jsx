import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { Element } from "react-scroll";

const Contact = () => {
  return (
    <Element name="contact">
      <section className="bg-gray-300 py-6">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
          <p className="mt-2 text-gray-600">
            We’d love to hear from you! Feel free to reach out using any of the
            methods below.
          </p>

          <div className="mt-2 space-y-6">
            {/* Contact Number */}
            <div className="flex items-center justify-center space-x-2">
              <span className="text-black">
                <i className="fas fa-phone-alt">
                  <FaPhoneAlt />
                </i>
              </span>
              <p className="text-lg text-gray-700">+2348021382833</p>
            </div>

            {/* Address */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-red-700">
                <i className="fas fa-map-marker-alt">
                  <FaMapMarkerAlt />
                </i>
              </span>
              <p className="text-lg text-gray-700">
                334 Old Ojo Rd, Alakija, Lagos 102102, Lagos
              </p>
            </div>

            {/* Social Media Handles */}
            <div className="flex items-center justify-center space-x-6">
              <a
                href="https://facebook.com/sparkhaven"
                className="text-blue-500 hover:text-blue-800"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f text-3xl">
                  <FaFacebook />
                </i>
              </a>
              <a
                href="https://twitter.com/sparkhaven"
                className="text-blue-500 hover:text-blue-900"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-3xl">
                  <FaTwitter />
                </i>
              </a>
              <a
                href="https://instagram.com/sparkhaven"
                className="text-pink-600 hover:text-red-700"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-3xl">
                  <FaInstagram />
                </i>
              </a>
              <a
                href="https://linkedin.com/company/sparkhaven"
                className="text-blue-500 hover:text-blue-900"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in text-3xl">
                  <FaLinkedin />
                </i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Contact;
