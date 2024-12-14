import React from "react";
import { Element } from "react-scroll";

const About = () => {
  return (
    <Element name="about">
      <section id="about" className="about-section bg-gray-200 py-6">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
          <p className="mt-2 text-gray-600">
            We believe that jewelry is more than just an accessory—it’s a
            reflection of your unique style, a celebration of special moments,
            and a cherished part of your story. At Spark Haven, we curate a
            stunning collection of timeless designs and contemporary trends to
            ensure there’s something for everyone. Whether you’re looking for a
            delicate piece to complement your everyday outfit or a show-stopping
            accessory for a special occasion, we’ve got you covered. Why Choose
            Spark Haven? Quality You Can Trust: Every piece in our collection is
            crafted with care using high-quality materials to ensure lasting
            beauty and durability. Unique Designs: Our jewelry is handpicked and
            designed to suit a variety of tastes and styles, from classic
            elegance to modern sophistication. Affordable Luxury: We believe
            that everyone deserves to shine. That’s why we offer exceptional
            pieces at accessible prices. Our Mission At Spark Haven, we aim to
            inspire confidence and celebrate individuality. Our jewelry is
            designed to make you feel empowered, elegant, and truly yourself. A
            Commitment to Sustainability We’re passionate about preserving the
            beauty of our planet. That’s why we prioritize ethical sourcing and
            sustainable practices in our operations. Let’s Spark a Connection
            We’re more than just a jewelry store; we’re a community of sparkle
            enthusiasts. Follow us on social media and share your Spark Haven
            moments with us. Let’s celebrate the beauty of life, together. Thank
            you for choosing Spark Haven. We’re honored to be a part of your
            journey.
          </p>

          <div className="mt-6">
            <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            <p className="mt-2 text-gray-600">
              At Spark Haven, we aim to inspire confidence and celebrate
              individuality. Our jewelry is designed to make you feel empowered,
              elegant, and truly yourself.
            </p>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default About;
