import React, { useState, useEffect } from "react";
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
};

const CompareLoan = () => {
  const [banks, setBanks] = useState([]);
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedBankDetail, setSelectedBankDetail] = useState(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch("/api/banks");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setBanks(data);
        setSelectedBanks(data.slice(0, 2));
      } catch (err) {
        console.error("Error fetching data:", err);
        setBanks([]);
        setSelectedBanks([]);
      }
    };
    fetchBanks();
  }, []);

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
      setSelectedBanks(selectedBanks.filter((_, i) => i !== index));
    }
  };

  const handleLearnMore = (bank) => {
    setSelectedBankDetail(bank);
    setShowDetail(true);
  };

  const handleBack = () => {
    setShowDetail(false);
    setSelectedBankDetail(null);
  };

  if (banks.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg animate-pulse">
        Loading banks...
      </div>
    );
  }

  if (showDetail && selectedBankDetail) {
    return (
      <section className="bg-gradient-to-b from-blue-50 via-green-100 to-green-200 py-12 min-h-screen">
        <div className="container mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBack}
              className="text-green-700 hover:text-green-800 font-semibold text-lg"
            >
              ← Back
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 drop-shadow-sm flex-1">
              {selectedBankDetail.name} Details
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col justify-between p-6 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md border border-green-700/30">
              <div className="flex justify-center items-center mb-6">
                <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-800">
                  {logoMap[selectedBankDetail.name.toLowerCase()] ? (
                    <img
                      src={`/Banks/${logoMap[selectedBankDetail.name.toLowerCase()]}`}
                      alt={selectedBankDetail.name}
                      className="w-12 h-12 rounded-full shadow-md"
                    />
                  ) : (
                    <Building className="text-gray-500" />
                  )}
                  {selectedBankDetail.name}
                </h3>
              </div>

              <div className="flex-1 space-y-4">
                {[
                  ["Purpose", selectedBankDetail.purpose],
                  ["Interest Rate (%)", selectedBankDetail.interestRate],
                  ["Loan Amount", selectedBankDetail.maxLoan],
                  ["Loan Tenure", selectedBankDetail.tenure],
                  ["Eligibility", selectedBankDetail.eligibility],
                  ["Prepayment Charges", selectedBankDetail.paymentCharges],
                  ["Processing Fee", selectedBankDetail.processingFee],
                  ["Pros", selectedBankDetail.pros],
                  ["Cons", selectedBankDetail.cons],
                ].map(([label, value], i) => (
                  <div key={i} className="flex justify-between items-start border-b border-gray-400 pb-2">
                    <span className="font-medium text-gray-800 w-1/3 text-center">
                      {label}:
                    </span>
                    <span className="text-gray-700 flex-1 text-center">{value}</span>
                  </div>
                ))}
                <div className="border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-800 block mb-1 text-center">
                    Documentation:
                  </span>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1 text-center">
                    {selectedBankDetail.documentation?.map((doc, i) => (
                      <li key={i}>{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 px-5 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-green-700 to-green-800 shadow-lg hover:shadow-green-300 hover:scale-105 hover:bg-gradient-to-r from-green-800 to-green-900 transition-all">
                  Apply Now
                </button>
                <button className="flex-1 px-5 py-2 rounded-xl font-semibold text-green-700 border border-green-700 bg-gradient-to-r from-white to-green-50 hover:bg-green-100 hover:text-green-800 hover:scale-105 transition-all">
                  Do I Qualify?
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-blue-50 via-green-100 to-green-200 py-12 min-h-screen">
      <div className="container mx-auto px-6 sm:px-10">
        <h2 className="text-3xl pt-10 md:text-5xl font-bold mb-10 text-center bg-gradient-to-b from-blue-700 to-blue-900 bg-clip-text text-transparent drop-shadow-sm">
          Compare Home Loan Offers
        </h2>

        <div
          className={`grid gap-4 md:gap-10 ${
            selectedBanks.length === 3 ? "grid-cols-3" : "grid-cols-2"
          }`}
        >
          {selectedBanks.map((bank, index) => (
            <div
              key={index}
              className="relative flex flex-col justify-between p-4 md:p-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md border border-green-700/30 hover:scale-[1.03] hover:shadow-green-200 transition-all duration-300"
            >
              {/* Header */}
              <div className="mb-4 md:mb-6">
                {/* Top row: Select and Cross */}
                <div className="flex justify-between items-center mb-2">
                  <select
                    value={bank.name}
                    onChange={(e) => handleBankChange(index, e.target.value)}
                    className="border border-gray-300 rounded-xl px-1 md:px-2 py-1 text-xs md:text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white/60"
                  >
                    {banks
                      .filter(
                        (b) =>
                          !selectedBanks.some(
                            (sb, sbIdx) => sbIdx !== index && sb.name === b.name
                          )
                      )
                      .map((b) => (
                        <option key={b.name} value={b.name}>
                          {b.name}
                        </option>
                      ))}
                  </select>
                  <div className="text-gray-400 cursor-pointer hover:text-red-500 transition-all"
                       onClick={() => removeBank(index)}>
                    ✕
                  </div>
                </div>

                {/* Next row: Image and Bank Name */}
                <div className="flex justify-center items-center">
                  <h3 className="flex items-center gap-2 md:gap-3 text-lg md:text-2xl font-bold text-gray-800">
                    {logoMap[bank.name.toLowerCase()] ? (
                      <img
                        src={`/Banks/${logoMap[bank.name.toLowerCase()]}`}
                        alt={bank.name}
                        className="w-8 md:w-10 h-8 md:h-10 rounded-full shadow-md"
                      />
                    ) : (
                      <Building className="text-gray-500" />
                    )}
                    <span className="hidden md:inline">{bank.name}</span>
                    <span className="md:hidden">{bank.name.split(' ')[0]}</span>
                  </h3>
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-2 md:space-y-4">
                {/* Desktop View */}
                <div className="hidden md:block">
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
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between items-start border-b border-gray-400 pb-2">
                      <span className="font-medium text-gray-800 w-1/3">
                        {label}:
                      </span>
                      <span className="text-gray-700 flex-1">{value}</span>
                    </div>
                  ))}
                  <div className="border-b border-gray-200 pb-2">
                    <span className="font-medium text-gray-800 block mb-1">
                      Documentation:
                    </span>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      {bank.documentation?.map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="block md:hidden">
                  <div className="text-center space-y-3">
                    <div className="text-sm">
                      <span className="font-medium text-gray-800">Interest: </span>
                      <span className="text-gray-700">{bank.interestRate}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-800">Loan Amount: </span>
                      <span className="text-gray-700">{bank.maxLoan}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-800">Tenure: </span>
                      <span className="text-gray-700">{bank.tenure}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-800">Processing Fee: </span>
                      <span className="text-gray-700">{bank.processingFee}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-800">Prepayment Charges: </span>
                      <span className="text-gray-700">{bank.paymentCharges}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 md:mt-6 flex flex-col gap-2 md:gap-4">
                <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
                  <button className="flex-1 px-3 md:px-5 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-green-700 to-green-800 shadow-lg hover:shadow-green-300 hover:scale-105 hover:bg-gradient-to-r from-green-800 to-green-900 transition-all text-sm md:text-base">
                    Apply Now
                  </button>
                  <button className="flex-1 px-3 md:px-5 py-2 rounded-xl font-bold text-green-800 border border-green-900 bg-green-100 hover:bg-gradient-to-r hover:from-green-700 hover:to-green-800 hover:text-white hover:scale-105 transition-all text-sm md:text-base">
                    Do I Qualify?
                  </button>
                </div>
                <button
                  onClick={() => handleLearnMore(bank)}
                  className="block md:hidden w-full px-3 py-2 rounded-xl font-bold text-blue-800 border border-blue-900 bg-blue-100 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 hover:text-white hover:scale-105 transition-all text-sm"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedBanks.length < 3 && (
          <div className="text-center mt-10">
            <button
              onClick={addBank}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-green-300 transition-all hover:scale-105"
            >
              + Add Bank
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompareLoan;
