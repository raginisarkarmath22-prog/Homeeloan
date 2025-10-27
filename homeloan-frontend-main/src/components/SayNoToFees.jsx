// File: src/components/FeesCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import feesBg from "../assets/keyfeatures.png"; // You can use your background

const fees = [
  { name: "Application Fees", present: false },
  { name: "Transfer Fees", present: false },
  { name: "Processing Fees", present: true },
  { name: "Exit Fees", present: false },
  { name: "Early Repay Fees", present: false },
  { name: "Account Fees", present: false },
];

export default function FeesCard() {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="relative w-full sm:w-[18rem] md:w-[17rem] rounded-3xl shadow-xl p-7 flex flex-col items-center"
      style={{
        fontFamily: "'Inter', 'Manrope', 'Segoe UI', Arial, sans-serif",
        backgroundImage: `url(${feesBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(200,200,255,0.16)",
        boxShadow:
          "0 8px 40px 0 rgba(44, 146, 255, 0.12), 0 2px 8px 0 rgba(20, 40, 80, 0.04)",
      }}
    >
      {/* Glass overlay for pure glassmorph */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          zIndex: 1,
        }}
      ></div>
      {/* Actual card content */}
      <div className="w-full z-10">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 tracking-tight drop-shadow-sm"
            style={{ fontFamily: "'Manrope', 'Inter', 'Segoe UI', Arial, sans-serif" }}>
          Fee Breakdown
        </h2>
        <ul className="flex flex-col gap-2">
          {fees.map((fee, i) => (
            <motion.li
              key={fee.name}
              layout
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition duration-200
                ${fee.present
                  ? 'bg-green-50 border border-green-200 shadow-md'
                  : 'bg-white/80 border border-gray-100 opacity-70 line-through select-none'}
                ${hovered === i && !fee.present ? 'opacity-90' : ''}`}
              style={{
                fontFamily: "'Manrope', 'Inter', 'Segoe UI', Arial, sans-serif",
                minHeight: '48px',
                cursor: 'pointer',
                zIndex: 2,
              }}
              animate={{
                scale: hovered === i ? 1.025 : 1,
                boxShadow: hovered === i && fee.present
                  ? "0 2px 8px 0 rgba(46, 189, 155, 0.18)"
                  : "none",
              }}
              transition={{ type: "spring", stiffness: 340, damping: 20 }}
            >
              <span className={`text-xl font-bold inline-block 
                ${fee.present ? "text-green-600" : "text-gray-400"}`}>
                {fee.present ? "✓" : "✗"}
              </span>
              <span className={`text-base font-medium 
                ${fee.present ? "text-gray-900" : "text-gray-500"}`}>
                {fee.name}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
