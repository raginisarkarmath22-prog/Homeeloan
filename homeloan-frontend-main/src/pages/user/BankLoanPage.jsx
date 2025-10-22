import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CalculatorForm from "../../components/CalculatorForm";
import EMIChart from "../../components/EMIChart";
import useEMICalculator from "../../hooks/useEMICalculator";
import bankContent from "../../data/bankContent"; // ✅ Import content
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { main } from "framer-motion/client";
import doIQualify from "../../assets/doIQualify.webp";
import Accordion from "../../components/BankpageAccordian";
import { useNavigate } from "react-router-dom";
import Ads from "../../components/ads";
import CompareLoan1 from "./ComparedLoanForBank";
import LoanPage from "./LoanPage";

const bankRates = {
  sbi: 7.5,
  hdfc: 7.0,
  icici: 7.25,
  axis: 6.8,
  pnb: 8.5,
};
export default function BankLoanPage() {
  const navigate = useNavigate();

  const { bank } = useParams();
  const defaultRate = bankRates[bank?.toLowerCase()] || 6.5;

  const [formData, setFormData] = useState({
    principal: 1000000,
    rate: defaultRate,
    tenure: 5,
  });

  // Update rate when bank changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      rate: defaultRate,
    }));
  }, [bank, defaultRate]);

  const { emi, totalInterest, totalAmount } = useEMICalculator(
    formData.principal,
    formData.rate,
    formData.tenure
  );

  const bankDetails = bankContent[bank?.toLowerCase()];

  // faq's----------------------------------

  return (
    <main className="pt-[80px] ">
      <div className="flex flex-row justify-between">
        <div
          className="p-6 max-w-6xl mx-auto "
        //  style={{ backgroundImage: `url(${doIQualify})` }}
        >
          {/* <h1 className="text-2xl font-bold mb-4">
        {bank?.toUpperCase()} Home Loan EMI Calculator
      </h1> */}

          <div className="bg-green-950 pt-2 p-1 pb-4 rounded-lg shadow-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className=" p-6 shadow-sm  rounded-md bg-green-800  shadow-black"
            >
              <h2 className="text-2xl font-serif font-semibold mb-3 text-center text-blue-100">
                {bank?.toUpperCase()} Home Loan EMI Calculator
              </h2>
              <p className="text-xs text-center text-white font-sans mb-10">
                Calculate your monthly payments and see what you can afford
              </p>
              <div className="flex flex-col  lg:flex-row justify-between items-start gap-5">
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-5/6 "
                >
                  <CalculatorForm
                    formData={formData}
                    setFormData={setFormData}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: 40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-5/3 "
                >
                  <EMIChart
                    principal={formData.principal}
                    interest={totalInterest}
                    emi={emi}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("/eligibility-form")}
              className=" px-16 py-3 shadow-green-950 shadow-lg bg-green-600 text-white text-xl rounded-xl hover:bg-green-800 transition"
            >
              Do I Qualify ?
            </button>
          </div>
          <div>
            {bankDetails && (
              <div className="mt-10">
                <h1 className="text-2xl font-bold mb-6">{bankDetails.name}</h1>

                {bankDetails.description.map((item, i) => {
                  if (item.type === "heading") {
                    return (
                      <h2
                        key={i}
                        className="text-xl font-bold mt-6 mb-3 text-gray-900"
                      >
                        {item.text}
                      </h2>
                    );
                  }

                  if (item.type === "list") {
                    return (
                      <ul
                        key={i}
                        className="list-disc pl-6 mb-4 text-gray-700 leading-relaxed"
                      >
                        {item.items.map((li, idx) => (
                          <li key={idx}>{li}</li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                      {item.text}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <CompareLoan1 currentBank={bank} />
          </div>

          {/* approved projects section ----------------------------------------------------------------------------------------------------------- */}
          <div>
            <LoanPage bankSlug={bank} />
          </div>
          {/* ---------------------------------------------------------------------- */}
          {/* Faq's section --------------------------------------------------------------- */}
          <div>
            <Accordion />
          </div>
        </div>
        {/* ads section  */}
        <div className="w-[60%] p-5 hidden lg:block">
          <Ads />
        </div>

      </div>
      <footer className="bg-gray-800 text-gray-300 py-6 text-[8px] md:text-sm">
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center mb-4 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
                  <path
                    fillRule="evenodd"
                    d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-xl font-bold">
                  https://homeeloan.com
                </span>
              </div>
              <p className="text-gray-100 mb-4">
                Making homeownership dreams come true with competitive rates and
                exceptional service.
              </p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-blue-400 text-white p-2 rounded-full transition-colors"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-blue-700 text-white p-2 rounded-md transition-colors"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
              </div>
            </div>
            {/* 

            {/* Loan Products  */}
            <div className="font-serif">
              <h3 className="text-white font-semibold text-xl mb-3">
                Loan Products
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="" className="hover:underline hover:text-white">
                    Home Loan
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline hover:text-white">
                    Loan Against Property
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline hover:text-white">
                    Re-Finance
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline hover:text-white">
                    Commercial Loan
                  </a>
                </li>
              </ul>
            </div>

            <div className="font-serif">
              <h3 className="text-white font-semibold text-xl mb-3">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="" className="hover:underline hover:text-white">
                    Home Loan
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline hover:text-white">
                    Loan Against Property
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline hover:text-white">
                    Re-Finance
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline hover:text-white">
                    Commercial Loan
                  </a>
                </li>
              </ul>
            </div>
            <div className="font-serif">
              <h3 className="text-white font-semibold text-xl mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="" className="hover:underline hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline hover:text-white">
                    Our Team{" "}
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline hover:text-white">
                    Contacts
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline hover:text-white">
                    Review{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()}{" "}
                <a href="https://homeeloan.com/" className="text-blue-600">
                  https://homeeloan.com/
                </a>{" "}
                All rights reserved. Empowering your homeownership journey with
                trust and transparency.
              </p>

              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  About Us
                </a>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Our Team
                </a>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Contact
                </a>
                <a
                  href="#support"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Support Center
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
