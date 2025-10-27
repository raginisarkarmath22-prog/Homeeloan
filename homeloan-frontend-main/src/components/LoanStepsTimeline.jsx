import React, { useState } from "react";

const steps = [
  {
    label: "Explore & Compare",
    content:
      "Compare home loans from leading banks — check rates, repayment flexibility, and benefits to choose the best fit for your dream home.",
  },
  {
    label: "Register Account",
    content:
      "Create your free account by providing basic personal and financial details. Registration helps us personalize your experience and prepare for the loan process.",
  },
  {
    label: "Submit Inquiry",
    content:
      "Fill out the inquiry form with your loan amount, tenure, and preferred banks. Submit your request or Direct contact Us on +91 602-602-602-6 to get expert assistance tailored to your requirements.",
  },
  {
    label: "Get Assistance",
    content:
      "Our team contacts you to review your details, clarify doubts, and recommend the best loan options suited to your profile.",
  },
  {
    label: "Application & Approval",
    content:
      "Receive help with document preparation and application submission. We coordinate with banks to facilitate quick approval and disbursement.",
  },
];

export default function StepperSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 p-6 py-16">
        <div className="flex flex-col md:flex-row backdrop-blur-lg bg-gradient-to-r from-green-700 to-green-800 border border-white/30 shadow-2xl rounded-2xl w-full max-w-7xl p-8 text-black overflow-hidden">

          {/* Stepper */}
          <div className="relative w-full md:w-1/3 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start md:pr-8 w-full">

            {/* Horizontal line for mobile */}
            <div className="absolute left-8 right-9 top-1/10 transform -translate-y-1/2 h-[2px] bg-[#14d159b5] border-t-2 border-dotted md:hidden"></div>

            {/* Vertical line for desktop */}
            <div className="absolute md:left-4 top-7 bottom-9 w-[2.5px] bg-[#14d159b5] border-l-2 border-dotted hidden md:block"></div>

            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-4 cursor-pointer relative z-10 mb-4 md:mb-8"
                onClick={() => setActiveIndex(idx)}
              >
                {/* Rotating dotted circle */}
                <div
                  className={`w-3 md:w-6 h-3 md:h-6 rounded-full md:ml-[5px] md:border-3 border-3 border-dotted animate-spin transition-all flex items-center justify-center ${activeIndex === idx
                      ? "border-white bg-[#202f57] animate-pulse"
                      : "border-[#3b7561] bg-[#202f57]"
                    }`}
                >
                  {activeIndex === idx && (
                    <div className="w-1 h-1 rounded-full bg-green-600"></div>
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={`text-xs md:text-sm lg:text-lg font-semibold tracking-wide transition-colors duration-300 text-center md:text-left ${activeIndex === idx ? "text-white" : "text-white/60"
                    }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="md:w-2/3 p-6 md:p-12 bg-white backdrop-blur-md rounded-xl transition-all duration-500">
            <h2 className="text-2xl md:text-5xl font-serif font-extrabold text-green-600 mb-4 text-center md:text-left">
              {steps[activeIndex].label}
            </h2>
            <p className="text-gray-800 md:text-xl leading-relaxed text-center md:text-left">
              {steps[activeIndex].content}
            </p>
          </div>
        </div>
      </div>

      {/* Inline animation keyframes */}
      <style>
        {`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spin-slow {
            animation: spin-slow 6s linear infinite;
          }
        `}
      </style>
    </>
  );
}
