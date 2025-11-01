import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CalculatorForm from "../../components/CalculatorForm";
import EMIChart from "../../components/EMIChart";
import useEMICalculator from "../../hooks/useEMICalculator";
import bankContent from "../../data/bankContent";
import { motion } from "framer-motion";
import doIQualify from "../../assets/doIQualify.webp";
import Accordion from "../../components/BankpageAccordian";
import { useNavigate } from "react-router-dom";
import Ads from "../../components/ads";
import ComparedLoan from "./ComparedLoan";
import LoanPage from "./LoanPage";
import Footer from "../../components/Footer";

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

  const adsRef = useRef(null);
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);

  // Update rate when bank changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      rate: defaultRate,
    }));
  }, [bank, defaultRate]);

  // Prevent overlapping footer
  useEffect(() => {
    const handleScroll = () => {
      if (!adsRef.current || !footerRef.current || !containerRef.current) return;

      const adsRect = adsRef.current.getBoundingClientRect();
      const footerRect = footerRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const offset = adsRect.bottom - footerRect.top;
      setTranslateY(offset > 0 ? -offset : 0);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const { emi, totalInterest, totalAmount } = useEMICalculator(
    formData.principal,
    formData.rate,
    formData.tenure
  );

  const bankDetails = bankContent[bank?.toLowerCase()];

  return (
    <main className="pt-[80px]">
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-80px)] items-start bg-green-100/70"
      >
        {/* Main content */}
        <div className="p-6 flex-1 h-full">
          <div className="bg-green-950 pt-2 p-1 pb-4 rounded-lg shadow-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="p-6 shadow-sm rounded-md bg-green-800 shadow-black"
            >
              <h2 className="text-2xl font-serif font-semibold mb-3 text-center text-blue-100">
                {bank?.toUpperCase()} Home Loan EMI Calculator
              </h2>
              <p className="text-xs text-center text-white font-sans mb-10">
                Calculate your monthly payments and see what you can afford
              </p>
              <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-5/6"
                >
                  <CalculatorForm formData={formData} setFormData={setFormData} />
                </motion.div>

                <motion.div
                  initial={{ x: 40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-5/3"
                >
                  <EMIChart principal={formData.principal} interest={totalInterest} emi={emi} />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("/eligibility-form")}
              className="px-3 py-1 shadow-green-900 shadow-lg bg-green-600 text-white text-lg text rounded-xl hover:bg-green-700 transition"
            >
              Do I Qualify ?
            </button>
          </div>

          {bankDetails && (
            <section
              className="mt-16 relative rounded-2xl bg-gradient-to-r from-blue-200/30 via-blue-300/10 to-blue-300/40 
               shadow-lg border border-gray-200/60 p-8 sm:p-10 
               transition-all duration-300 hover:shadow-2xl"
            >
              <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-blue-900 tracking-tight">
                {bankDetails.name}
              </h1>

              <div className="space-y-6 text-gray-800 leading-relaxed">
                {bankDetails.description.map((item, i) => {
                  if (item.type === "heading") {
                    return (
                      <h2
                        key={i}
                        className="text-xl sm:text-2xl font-semibold mt-10 mb-3 text-green-700 
             border-l-4 border-green-500 pl-3 tracking-wide 
             transition-all duration-300 hover:text-blue-800 
             hover:translate-x-2 hover:drop-shadow-md"
                      >
                        {item.text}
                      </h2>

                    );
                  }

                  if (item.type === "list") {
                    return (
                      <ul
                        key={i}
                        className="list-disc pl-6 sm:pl-8 mb-4 text-gray-700 space-y-2 marker:text-green-600"
                      >
                        {item.items.map((li, idx) => (
                          <li
                            key={idx}
                            className="hover:text-green-700 transition-colors duration-200"
                          >
                            {li}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p
                      key={i}
                      className="text-gray-700 text-[15px] sm:text-base mb-4 leading-relaxed"
                    >
                      {item.text}
                    </p>
                  );
                })}
              </div>
            </section>
          )}

          <ComparedLoan />
          <LoanPage bankSlug={bank} />
          <Accordion />
        </div>

        {/* Ads Section */}
        <div
          ref={adsRef}
          className="p-5 flex-shrink-0 hidden lg:block sticky top-0"
          style={{ transform: `translateY(${translateY}px)` }}
        >
          <Ads />
        </div>
      </div>

      <Footer ref={footerRef} />
    </main>
  );
}
