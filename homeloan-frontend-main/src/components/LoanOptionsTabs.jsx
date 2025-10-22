import React, { useState } from "react";
import percentIcon from "../assets/percentgeLogo.png";
import { AiOutlineCheckCircle } from "react-icons/ai";
import keyFeaturesBg from "../assets/keyfeatures.png";
// import blackBg from "../assets/black___bg.png";
import blackBg from "../assets/sayNoToFees.jpg";
import piggy from "../assets/1.mp4";
import useAnimatedCounter from "../hooks/beRewardedAnimateCounter"; // adjust path as needed
import { useNavigate } from "react-router-dom";

import percentageVideo from "../assets/percentage_video.mp4";

const loanData = {

  "Home Loan": {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-10 h-10 text-blue-600"
      >
        <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
        <path
          fillRule="evenodd"
          d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: "Home Loan",
    subtitle:
      "Achieve your dream of homeownership with affordable interest rates, flexible repayment terms, and quick approvals.",
    features: [
      "Low interest rates starting from 8.5%",
      "Up to 90% of property value as loan",
      "Flexible repayment tenure up to 30 years",
      "Minimal documentation and fast processing",
      "Tax benefits on principal & interest repayment",
    ],

    sayNoToFees: [
      { name: "Application Fees", allowed: false },
      { name: "Transfer Fees", allowed: false },
      { name: "Processing Fees", allowed: true },
      { name: "Exit Fees", allowed: false },
      { name: "Early Repay Fees", allowed: false },
      { name: "Account Fees", allowed: false },
    ],
    details: {
      rate: "8.5 - 10.2%",
      tenure: "Up to 30 Years",
      maxAmount: "2 Crore +",
    },
  },

  "Loan Against Property": {
    title: "Loan Against Property",
    subtitle: "Unlock the value of your property for business or personal use.",
    features: [
      "Loan up to 70% of property value",
      "Flexible usage: Business, Education, Marriage",
      "Long tenure with low EMI's",
      "Quick disbursal",
    ],
    sayNoToFees: [
      { name: "Application Fees", allowed: false },
      { name: "Transfer Fees", allowed: false },
      { name: "Processing Fees", allowed: true },
      { name: "Exit Fees", allowed: false },
      { name: "Early Repay Fees", allowed: false },
      { name: "Account Fees", allowed: false },
    ],
    details: {
      rate: "9.0% - 11.5%",
      tenure: "Up to 15 Years",
      maxAmount: "₹5 Crore+",
    },
  },

  "Re-finance": {
    title: "Re-finance",
    subtitle: "Switch your existing loan to save on interest and reduce EMIs.",
    features: [
      "Lower interest rates",
      "Balance transfer facility",
      "Top-up loans available",
      "Fast processing",
    ],
    sayNoToFees: [
      { name: "Application Fees", allowed: false },
      { name: "Transfer Fees", allowed: false },
      { name: "Processing Fees", allowed: true },
      { name: "Exit Fees", allowed: false },
      { name: "Early Repay Fees", allowed: false },
      { name: "Account Fees", allowed: false },
    ],
    details: {
      rate: "8.0% – 9.5%",
      tenure: "Remaining loan term",
      maxAmount: "As per existing loan",
    },
  },

  "Commercial Loan": {
    title: "Commercial Loan",
    subtitle:
      "Finance your commercial property purchases with tailored solutions.",
    features: [
      "Funding for offices, shops, industrial spaces",
      "Custom repayment schedules",
      "Higher ticket sizes",
      "Structured EMI plans",
    ],

    sayNoToFees: [
      { name: "Application Fees", allowed: false },
      { name: "Transfer Fees", allowed: false },
      { name: "Processing Fees", allowed: true },
      { name: "Exit Fees", allowed: false },
      { name: "Early Repay Fees", allowed: false },
      { name: "Account Fees", allowed: false },
    ],
    details: {
      rate: "9.5% – 12.0%",
      tenure: "Up to 20 years",
      maxAmount: "₹10 Crore+",
    },
  },
  "Construction Loan": {
    title: "Construction Loan",
    subtitle:
      "Finance your commercial property purchases with tailored solutions.",
    features: [
      "Funding for offices, shops, industrial spaces",
      "Custom repayment schedules",
      "Higher ticket sizes",
      "Structured EMI plans",
    ],

    sayNoToFees: [
      { name: "Application Fees", allowed: false },
      { name: "Transfer Fees", allowed: false },
      { name: "Processing Fees", allowed: true },
      { name: "Exit Fees", allowed: false },
      { name: "Early Repay Fees", allowed: false },
      { name: "Account Fees", allowed: false },
    ],

    details: {
      rate: "9.5% – 12.0%",
      tenure: "Up to 20 years",
      maxAmount: "₹10 Crore+",
    },
  },
};

const LoanOptionsTabs = () => {
  const tabs = [
    { label: "Home Loan", shortLabel: "Home Loan", icon: percentIcon },
    {
      label: "Loan Against Property",
      shortLabel: "Loan Against Property",
      icon: percentIcon,
    },
    { label: "Re-finance", shortLabel: "Re-finance", icon: percentIcon },
    {
      label: "Commercial Loan",
      shortLabel: "Commercial Loan",
      icon: percentIcon,
    },
    {
      label: "Construction Loan",
      shortLabel: "Construction Loan",
      icon: percentIcon,
    },
  ];

  const [selected, setSelected] = useState("Home Loan");
  const selectedData = loanData[selected];
  const { ref: rewardRef, count } = useAnimatedCounter(0.3, 5000);
  const navigate = useNavigate();

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto rounded-xl border-2 border-green-900  bg-gray-50 ">
      <div className="relative max-w-5xl border border-green-900  flex justify-center mb-6 w-full">
        {/* Scroll Arrow Indicator (Right side) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none md:hidden">
          <div className="w-10 h-10 bg-gradient-to-l from-white to-transparent flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-900 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="w-full relative">
          <div className="flex flex-wrap gap-2 justify-center items-center p-2 bg-white rounded-sm shadow-md">
            {tabs.map((tab) => {
              const isActive = selected === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => setSelected(tab.label)}
                  className={`relative flex items-center border border-green-900 h-9 gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer focus:outline-none font-bold ${isActive
                      ? "bg-green-700 text-white text-sm shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 text-sm hover:bg-green-300/50"
                    }`}
                  aria-pressed={isActive}
                  aria-label={tab.label}
                >
                  <span className="hidden sm:inline font-serif">{tab.label}</span>
                  <span className="inline sm:hidden font-serif">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>


      </div>

      {/* Content */}
      {selectedData && (
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-5xl mx-auto transition-all duration-300">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              {selected === "Loan Against Property" || selected === "Re-finance" || selected === "Commercial Loan" || selected === "Construction Loan" || selected === "Home Loan" ? (
                <>
                  <video
                    src={percentageVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-10 w-10 object-cover rounded-full"
                  />
                  <h2 className="text-2xl font-bold font-sans text-gray-900">
                    {selectedData.title}
                  </h2>
                </>
              ) : (
                <>
                  {selectedData.icon}
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedData.title}
                  </h2>
                </>
              )}
            </div>
            <div className=" text-center">
              <button
                onClick={() => navigate("/eligibility-form")}
                className=" px-4  h-8 shadow-blue-950 text-green-800 font-bold text-m rounded-xl border border-green-900 transition"
              >
                Do I Qualify ?
              </button>
            </div>
          </div>

          <p className="mb-8 text-gray-700 text-xl text-center md:text-left font-semibold">
            {selectedData.subtitle}
          </p>

          {/* Loan Details */}
          {selectedData.details && (
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="bg-blue-100/50 p-3 rounded-lg shadow hover:shadow-xl transition border border-blue-900">
                <h4 className="text-lg font-semibold text-blue-600 mb-2">
                  Interest Rate
                </h4>
                <p className="text-gray-700">{selectedData.details.rate}</p>
              </div>
              <div className="bg-green-100/60 p-3 rounded-lg shadow hover:shadow-md transition border border-green-900">
                <h4 className="text-lg font-semibold text-green-600 mb-2">
                  Tenure
                </h4>
                <p className="text-gray-700">{selectedData.details.tenure}</p>
              </div>
              <div className="bg-yellow-100/60 p-3 rounded-lg shadow hover:shadow-md transition border border-yellow-900">
                <h4 className="text-lg font-semibold text-yellow-600 mb-2">
                  Max Amount
                </h4>
                <p className="text-gray-700">
                  {selectedData.details.maxAmount}
                </p>
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className=" grid gap-4   sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div
              className="rounded-xl border border-green-900 shadow-lg transform hover:scale-105 transition-transform duration-300 w-full h-85  md:w-72 md:h-full "
              style={{
                backgroundImage: `url(${keyFeaturesBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h4 className="text-md  text-center md:mt-22 mt-12 font-serif font-semibold  text-black drop-shadow">
                Key Features
              </h4>
              <ul className="space-y-3   w-1/2 md:ml-20 ml-19 p-1.5   text-[#130e0ea8] text-start font-semibold font-serif text-sm ">
                {selectedData.features.map((feature, index) => (
                  <li key={index} className="flex items-start  gap-1">
                    <div><AiOutlineCheckCircle className="text-green-800  mt-1" /></div>
                    <span className="drop-shadow">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Be Rewarded  */}

            <div
              ref={rewardRef}
              className="relative rounded-2xl border border-green-900 overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 text-center h-auto min-h-[400px]"
            >
              <video
                src={piggy}
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black/30" />
              <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-center items-center h-full">
                <h4 className="text-2xl mb-2 font-bold md:-mt-70 -mt-50 text-black drop-shadow-lg uppercase tracking-wide">
                  Be Rewarded
                </h4>
                <ul className="text-white  sm:font-semibold font-bold font-sans text-base">
                  <span className="text-4xl font-[analog] rounded-2xl shadow-sm shadow-blue-50 bg-black px-2 ">
                    {count.toFixed(2)}%
                  </span>
                  <li className="md:text-xl mt-1 text-lg text-black font-mono ">
                    Additional rate discount in year 30
                    <br />
                    No negotiation needed
                  </li>
                </ul>
              </div>
            </div>

            {/* Say No To Fees Section  */}
            <div
              className="rounded-2xl border border-green-900 shadow-lg transform hover:scale-105 transition-transform duration-300 text-center w-full h-120 md:w-[270px] md:h-[465px]"
              style={{
                backgroundImage: `url(${blackBg})`,
                backgroundSize: "cover", // Ensures image covers full div
                backgroundPosition: "center", // Keeps image centered
                backgroundRepeat: "no-repeat",
                // Prevents repetition
              }}
            >
              <div className="flex flex-col items-center justify-center mt-29 gap-3 w-full">
                {selectedData.sayNoToFees.map((fee, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-start space-x-3 px-0.5 py-1 rounded-full text-[10px] font-semibold w-[120px] ${fee.allowed
                        ? "bg-red-500 text-white shadow-md ml-30"
                        : "bg-black text-white mr-30"
                      }`}
                  >
                    <span
                      className={`text-sm ${fee.allowed ? "text-green-300" : "text-red-500"
                        }`}
                    >
                      {fee.allowed ? "✓✓" : "❌"}
                    </span>
                    <span>{fee.name}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs underline mt-3 ml-25 shadow-2xl font-mono font-extrabold w-30 text-black">
                In certain circumstances LMI premium may apply.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanOptionsTabs;
