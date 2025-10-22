import React, { useState } from "react";
import { ChevronDownCircle } from "lucide-react"; // just one icon
import robo from "../assets/robo.png";

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
    <div className="max-w-6xl mx-auto px-4 py-8 shadow-sm">
      <div className="flex items-center justify-center bg-white p-6 shadow-sm gap-4 mb-2 relative">
        <h2 className="text-lg sm:text-3xl mr-12 font-bold text-gray-800">
          Frequently Asked Questions
        </h2>
        <img
          src={robo}
          alt="Robot"
          className="absolute md:w-56 w-45 h-auto md:ml-110 ml-57"
        />
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-gray-200 bg-white rounded-xl shadow-sm transition-all duration-500 hover:shadow-md"
          >
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center w-full px-5 py-3 text-left font-medium text-gray-800 text-base sm:text-lg hover:bg-[#f7f7f7b0] bg-[#f5f5f5] focus:outline-none"
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
              <div className="px-7 py-2 pb-5 text-sm sm:text-base text-gray-600 space-y-2">
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
    </div>
  );
};

export default Accordion;
