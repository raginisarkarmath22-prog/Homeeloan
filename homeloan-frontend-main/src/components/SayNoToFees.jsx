import React, { useState } from "react";
import { motion } from "framer-motion";
import blackBg from "../assets/sayNoToFees.png";

const fees = [
  {
    name: "Application Fees",
    allowed: false,
    detail: "No application fees charged for loan processing.",
  },
  {
    name: "Transfer Fees",
    allowed: false,
    detail: "Transfer fees are waived for seamless transactions.",
  },
  {
    name: "Processing Fees",
    allowed: true,
    detail: "Processing fees may apply in certain circumstances.",
  },
  {
    name: "Exit Fees",
    allowed: false,
    detail: "No exit fees for early loan closure.",
  },
  {
    name: "Early Repay Fees",
    allowed: false,
    detail: "Early repayment fees are not applicable.",
  },
  {
    name: "Account Fees",
    allowed: false,
    detail: "No additional account maintenance fees.",
  },
];

export default function SayNoToFees() {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="w-full flex flex-col items-center gap-6 p-6 rounded-3xl border border-green-900/20 min-h-[400px]"
      style={{
        backgroundImage: `url(${blackBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight drop-shadow-sm">
        Say No To Fees
      </h2>
      <div className="flex flex-col w-full gap-4">
        {fees.map((fee, index) => {
          const isActive = hovered === index;
          return (
            <motion.div
              key={index}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className="rounded-xl overflow-hidden cursor-pointer"
              layout
              transition={{ duration: 0.3 }}
            >
              {/* White Glassmorphism Card */}
              <motion.div
                className="relative bg-white/40 backdrop-blur-xs rounded-xl flex flex-col transition-all duration-300 shadow-md"
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
                  className="font-semibold text-gray-800 px-2 py-1 flex items-center gap-2"
                  animate={{
                    fontSize: isActive ? "0.875rem" : "1rem",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span
                    className={`text-sm ${fee.allowed ? "text-green-800" : "text-red-500"}`}
                  >
                    {fee.allowed ? "✓✓" : "❌"}
                  </span>
                  {fee.name}
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
                  {fee.detail}
                </motion.p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      <p className="text-xs text-gray-800 mt-4 italic">
        In certain circumstances LMI premium may apply.
      </p>
    </div>
  );
}
