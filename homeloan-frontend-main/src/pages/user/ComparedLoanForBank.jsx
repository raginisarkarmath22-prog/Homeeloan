// comparedLoanForBank.jsx page

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Building } from "lucide-react";

const logoMap = {
  "state bank of india": "sbi.png",
  "hdfc bank": "hdfc.png",
  "axis bank": "axis.png",
  "punjab national bank": "pnb.png",
  "icici bank": "icici.png",
  "allahabad bank": "Allahabadbank.png",
  "bank of india": "boi.png",
  "idfc first bank": "idfc.png",
  "indusind bank": "indusind.png",
  "kotak mahindra bank": "kotak.png",
  "union bank of india": "unionbank.png",
  "yes bank": "yesbank.png",
  // Add more mappings as needed
};

const bankSlugMap = {
  sbi: "State Bank of India",
  hdfc: "HDFC Bank",
  icici: "ICICI Bank",
  axis: "Axis Bank",
  pnb: "Punjab National Bank",
  // Add more as needed
};

const CompareLoan1 = ({ currentBank }) => {
  const [banks, setBanks] = useState([]);
  const [selectedBanks, setSelectedBanks] = useState([]);

 useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch("/api/banks");
        const data = await res.json();

        // Map slug to actual bank name
        const mainBankName = bankSlugMap[currentBank?.toLowerCase()] || currentBank;

        // Find the bank matching mapped name
        const mainBank = data.find(
          (b) => b.name.toLowerCase() === mainBankName?.toLowerCase()
        );

        // ...rest of your logic...
        const others = data.filter(
          (b) => b.name.toLowerCase() !== mainBankName?.toLowerCase()
        );

        const randomBank =
          others.length > 0
            ? others[Math.floor(Math.random() * others.length)]
            : null;

        if (mainBank) {
          if (randomBank) {
            setSelectedBanks([mainBank, randomBank]);
          } else {
            setSelectedBanks([mainBank]);
          }
        } else {
          setSelectedBanks(data.slice(0, 2));
        }

        setBanks(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBanks();
  }, [currentBank]);



  const handleBankChange = (index, name) => {
    const updated = [...selectedBanks];
    const selected = banks.find((b) => b.name === name);
    if (selected) updated[index] = selected;
    setSelectedBanks(updated);
  };

  const addBank = () => {
    if (selectedBanks.length < 3) {
      const nextBank = banks.find(
        (b) => !selectedBanks.some((sb) => sb.name === b.name)
      );
      if (nextBank) setSelectedBanks([...selectedBanks, nextBank]);
    }
  };

  const removeBank = (index) => {
    if (selectedBanks.length > 1) {
      const updated = selectedBanks.filter((_, i) => i !== index);
      setSelectedBanks(updated);
    }
  };

  if (banks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">Loading banks...</div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-green-100 to-blue-100 py-10 md:min-h-screen">
      <div className="w-full sm:px-8 py-8 max-w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Compare Home Loan Offers
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-stretch place-items-stretch">
        {selectedBanks.map((bank, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-between h-full min-h-[600px] rounded-2xl shadow-lg bg-white p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="flex items-center gap-2 text-2xl font-semibold text-black">
                  {logoMap[bank.name.toLowerCase()] ? (
                    <img
                      src={`/Banks/${logoMap[bank.name.toLowerCase()]}`}
                      alt={bank.name}
                      className="w-8 h-8"
                    />
                  ) : (
                    <Building className="text-gray-500" />
                  )}
                  {bank.name} 🏦
                </h2>
                <div className="flex items-center">
                  <select
                    value={bank.name}
                    onChange={(e) =>
                      handleBankChange(index, e.target.value)
                    }
                    className="ml-5 text-xs md:px-2 md:py-1 md:text-sm border rounded-md"
                  >
                    {banks
                      .filter(
                        (b) =>
                          !selectedBanks.some(
                            (sb, sbIdx) =>
                              sbIdx !== index && sb.name === b.name
                          )
                      )
                      .map((b) => (
                        <option key={b.name} value={b.name}>
                          {b.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Desktop Content */}
              <div className="hidden md:block space-y-4 flex-1">
                {[
                  ["Purpose", bank.purpose],
                  ["Interest Rate (%)", bank.interestRate],
                  ["Loan Amount", bank.maxLoan],
                  ["Loan Tenure", bank.tenure],
                  ["Eligibility", bank.eligibility],
                  ["Prepayment Charges", bank.paymentCharges],
                  ["Processing Fee", bank.processingFee],
                  ["Pros", bank.pros],
                  ["Cons", bank.cons],
                ].map(([label, value], idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4 border-b border-gray-200 pb-2">
                    <span className="font-medium text-black w-1/3">{label}:</span>
                    <span className="text-black flex-1">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-start gap-4 border-b border-gray-200 pb-2">
                  <span className="font-medium text-black w-1/3">Documentation:</span>
                  <ul className="list-disc pl-4 space-y-1 text-black flex-1">
                    {bank.documentation.map((doc, i) => (
                      <li key={i}>{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mobile View */}
              <div className="block md:hidden space-y-4 mt-4">
                {[
                  ["Interest", bank.interestRate],
                  ["Loan Amount", bank.maxLoan],
                  ["Tenure", bank.tenure],
                  ["Processing Fees", bank.processingFee],
                  ["Payment Charges", bank.paymentCharges],
                ].map(([label, value], i) => (
                  <div key={i} className="flex justify-between items-center gap-4">
                    <span className="font-medium text-black text-sm">{label}:</span>
                    <span className="text-black text-sm">{value}</span>
                  </div>
                ))}
                <div className="text-center">
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm"
                  >
                    Know more <span>→</span>
                  </a>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-auto flex justify-between gap-3">
                <button className="relative overflow-hidden rounded-xl px-5 py-2 font-semibold text-white shadow-lg bg-gradient-to-r from-green-600 to-blue-600 hover:scale-105 transition-transform duration-300 flex-1">
                  <span className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-xl"></span>
                  <span className="relative z-10">Apply Now</span>
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                  Do I Qualify?
                </button>
              </div>
            </div>
          );
        })}
        </div>

        {/* Add Bank Button */}
        {selectedBanks.length < 3 && (
          <div className="mt-8 text-center">
            <button
              onClick={addBank}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
            >
              + Add Bank
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompareLoan1;
