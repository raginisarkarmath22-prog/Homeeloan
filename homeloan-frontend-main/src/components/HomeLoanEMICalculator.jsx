import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import CalculatorForm from "./CalculatorForm";
import EMIChart from "./EMIChart";
import useEMICalculator from "../hooks/useEMICalculator";

function HomeLoanEMICalculator() {
  const [formData, setFormData] = useState({
    principal: 1000000,
    rate: 6.5,
    tenure: 5,
  });

  const { emi, totalInterest } = useEMICalculator(
    Number(formData.principal),
    Number(formData.rate),
    Number(formData.tenure)
  );

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="bg-green-950 pt-4 pb-6 px-4 md:pt-6 md:pb-8 md:px-6 max-w-7xl mx-auto rounded-xl shadow-2xl border border-green-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 lg:p-10 shadow-lg rounded-lg bg-green-800 max-w-7xl mx-auto shadow-black/50 border border-green-700"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-center text-blue-100 tracking-wide">
              Home Loan EMI Calculator
            </h2>
            <p className="text-sm md:text-base text-center text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
              Calculate your monthly payments and see what you can afford with precision
            </p>
          </div>
          <div className="flex flex-col xl:flex-row justify-between items-start gap-8 lg:gap-10">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="w-full xl:w-2/5 bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10 hover:shadow-xl transition-shadow duration-300"
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
              className="w-full xl:w-3/5"
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
    </div>
  );
}

export default HomeLoanEMICalculator;
