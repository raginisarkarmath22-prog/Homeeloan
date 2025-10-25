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
            <ComparedLoan />
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
      <Footer />
    </main>
  );
}
