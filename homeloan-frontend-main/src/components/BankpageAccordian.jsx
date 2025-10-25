import React, { useState } from "react";
import { ChevronDownCircle } from "lucide-react"; // just one icon
import { motion } from "framer-motion";
import robo from "../assets/robo1.png";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const faqs = [
    {
      question: "When do my home loan EMIs start?",
      answer:
        "EMIs begin from the month subsequent to the month in which disbursement of the loan is done.",
    },
    {
      question: "What is a pre-EMI on a home loan?",
      answer: [
        "Pre-EMI refers to monthly payments that solely cover the interest portion of your home loan, without any repayment towards the principal amount. This option is available while your home or apartment is being constructed. Pre-EMI payments are lower since they exclude the principal component of the home loan. Once construction is finished, your lender will require you to start paying the full EMI, which includes both interest and principal.",
        "Remember, a pre-EMI is not considered a part of the home loan tenor. It is designed to reduce the burden on you during the time that your asset is under development.",
      ],
    },
    {
      question: "Is the EMI fixed throughout the loan tenure?",
      answer:
        "For fixed-rate loans, the EMI remains constant. However, for floating rate loans, EMIs can change with fluctuations in interest rates.",
    },
    {
      question: "Can I make part payments towards my home loan?",
      answer:
        "Yes, most lenders allow part prepayments which can help in reducing the total interest burden.",
    },
    {
      question: "What are the tax benefits of paying home loan EMIs?",
      answer: [
        "There are several tax benefits and concessions attached to paying home loan EMIs, such as:",
        "Section 80C: You can claim a tax rebate on the principal component of your home loan EMI, up to Rs. 1.5 lakh every year",
        "Section 24(b): You can claim a tax rebate on the interest component of your home loan EMI, up to Rs. 2 lakh every year",
        "Section 80EE: You can claim a tax rebate on the interest component of your home loan, after you have exhausted the claimed cap under Section 24(b), up to Rs. 50,000, only if you are a first-time home buyer",
        "New Tax Regime: There were slight changes made to the home loan tax benefits under the new tax regime, which were announced during the Union Budget 2023 by Finance Minister Nirmala Sitharaman.",
        "The majority of other deductions, including those for home loans, house rent allowance (HRA), etc., are not available in the new tax regime, despite the introduction of a standard deduction of Rs. 52,500.",
        "The most significant pronouncements concern raising the tax slabs under the new system. For instance, the exemption threshold has increased from Rs.2.5 lakh to Rs.3 lakh under the new system. Also, the income threshold with a 10% tax has been raised from Rs.5 lakh to Rs 7.5 lakh and Rs. 6 lakh to Rs. 9 lakh.",
      ],
    },
    {
      question: "What happens if I miss an EMI payment?",
      answer:
        "Missing an EMI can negatively impact your credit score and also lead to penalties. It's essential to ensure timely payments or inform the lender in case of difficulties.",
    },
    {
      question: "How To Reduce EMI Amount on A Home Loan?",
      answer: [
        "Once the home EMI calculator shows you your EMI amount you will have a clearer picture of your home loan repayment break-up. To reduce your EMI amount on a home loan follow these tips:",
        "• Choose a higher down payment – A higher down payment gives you a lesser principal amount on which the EMI is calculated. If the principal amount is low the EMI will also be lower.",
        "• Choose a long repayment tenure – A longer repayment tenure gives you more time to repay your loan and hence the EMI is also reduced.",
        "• Take a balance transfer loan – These loans are typically offered at lower rates of interest.",
      ],
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-16 bg-gradient-to-br from-green-950 via-green-800 to-green-950 overflow-hidden border-2 border-green-700/60 rounded-lg">
      {/* subtle background glows */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />

      {/* heading */}
      <motion.div
        className="flex items-center justify-center relative mb-20 z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-3 backdrop-blur-md bg-white/100 border border-white/20 px-8 py-2 rounded-full shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-800 to-green-700 bg-clip-text text-transparent text-center">
            Frequently Asked Questions
          </h2>
        </div>
        <img
          src={robo}
          alt="Friendly robot"
          className="block w-20 md:w-38 h-auto object-contain self-center opacity-90 drop-shadow-[0_10px_15px_rgba(255,255,255,4)] absolute left-4 md:left-30 transform -translate-x-1/2"
        />
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-shadow duration-300 rounded-xl"
          >
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center w-full px-5 py-3 text-left font-medium text-white text-base sm:text-lg hover:bg-white/20 bg-white/10 focus:outline-none rounded-xl"
            >
              {faq.question}
              <div className="pl-2">
                <ChevronDownCircle
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>
            {openIndex === index && (
              <div className="px-7 py-2 pb-5 text-sm sm:text-base text-white/90 space-y-2">
                {Array.isArray(faq.answer) ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {faq.answer.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{faq.answer}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Accordion;
