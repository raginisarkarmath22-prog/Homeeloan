import React, { useState, useEffect } from "react";

// Placeholder ad data mapped by adId
const ads = {
  1: {
    title: "Explore Our Designs",
    tagline: "See our gallery of stunning home transformations.",
    img: "/blog/04.jpg",
    link: "#",
  },
  2: {
    title: "Upgrade Your Kitchen Today",
    tagline: "Modern, functional kitchens built for your lifestyle.",
    img: "/blog/02.jpg",
    link: "#",
  },
  3: {
    title: "Maruti Suzuki Car",
    tagline: "The Maruti car price starts at ₹3.70",
    img: "/blog/05.jpeg",
    link: "#",
  },
};

export const adsCount = Object.keys(ads).length;

const Ads = ({ adId = 1 }) => {
  const [rotationIndex, setRotationIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationIndex((prev) => (prev + 1) % 3);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const adsArray = [ads[1], ads[2], ads[3]];
  const adsToShow = [...adsArray.slice(rotationIndex), ...adsArray.slice(0, rotationIndex)];

  return (
    <div className="flex flex-col gap-6 items-center">
      {adsToShow.map((ad, index) => (
        <div key={index} className="inline-block">
          {/* Label placed outside the card so it doesn't overlap */}
          <div className="text-[10px] text-gray-900 font-medium mb-1">
            Sponsored Ad
          </div>
          <div className="w-[200px] sm:w-[220px] border border-gray-300 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
            <a
              href={ad.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full"
            >
              {/* Background Image */}
              <img
                src={ad.img}
                alt={ad.title}
                className="w-full h-32 md:h-40 object-cover rounded-t-xl"
              />

              {/* Content Section */}
              <div className="p-1 md:p-2 bg-blue-300/20 backdrop-blur-sm text-black">
                <h3 className="text-xs md:text-sm font-bold mb-0.5 leading-tight">
                  {ad.title}
                </h3>
                {ad.tagline && (
                  <p className="text-xs mb-2 leading-snug">
                    {ad.tagline}
                  </p>
                )}
                {/* Checkout Button */}
                <button className="w-full px-3 py-1 bg-gradient-to-r from-green-800 to-green-950 text-white text-xs font-semibold rounded-md transition-colors duration-200 text-center">
                  Checkout
                </button>
              </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ads;
