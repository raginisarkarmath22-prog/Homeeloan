// File: src/components/KeyFeaturesCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import keyFeaturesBg from '../assets/keyfeatures.png';

const defaultFeatures = [
  {
    title: "Low interest rates starting from 8.5%",
    detail: "Save more over the long term with competitive rates.",
  },
  {
    title: "Up to 90% of property value as loan",
    detail: "Leverage your property’s worth for maximum funding.",
  },
  {
    title: "Flexible repayment tenure up to 30 years",
    detail: "Tailor EMIs to match your financial goals.",
  },
  {
    title: "Minimal documentation and fast processing",
    detail: "Simple, transparent, and quick loan approval.",
  },
  {
    title: "Principal & interest repayment benefits",
    detail: "Enjoy tax benefits and better financial control.",
  },
];

export default function KeyFeaturesCard({ features = defaultFeatures, onHoverStart, onHoverEnd }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="w-full flex flex-col items-center gap-6 p-6 rounded-3xl border border-green-900/20 min-h-[400px]"
      style={{
        backgroundImage: `url(${keyFeaturesBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight drop-shadow-sm">
        Key Features
      </h2>
      <div className="flex flex-col w-full gap-4">
        {features.map((feat, i) => {
          const isActive = hovered === i;
          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="rounded-xl overflow-hidden cursor-pointer"
              layout
              transition={{ duration: 0.3 }}
            >
              {/* White Glassmorphism Card */}
              <motion.div
                className="relative bg-white/10 backdrop-blur-xs rounded-xl flex flex-col transition-all duration-300 shadow-md"
                style={{
                  border: "1px solid rgba(255,255,255,0.3)",
                  transform: isActive ? "scale(1.03)" : "scale(1)",
                }}
                animate={{
                  filter: isActive ? "brightness(1.1)" : "brightness(1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3
                  className="font-semibold text-gray-800 px-2 py-1"
                  animate={{
                    fontSize: isActive ? "0.875rem" : "1rem",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {feat.title}
                </motion.h3>
                <motion.p
                  className="text-sm text-gray-600 px-4 pb-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    height: isActive ? "auto" : 0,
                  }}
                  transition={{ duration: 0.33 }}
                >
                  {feat.detail}
                </motion.p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
