import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building, Percent, CreditCard, CalendarDays } from "lucide-react";
import Ads from "../../components/ads";

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

const InfoRow = ({ label, value, Icon, color }) => (
  <div className="flex items-center gap-2 text-sm sm:text-base mb-2">
    <Icon className={`w-4 h-4 ${color}`} />
    <span className="font-medium text-gray-700">{label}:</span>
    <span className={`font-semibold ${color}`}>
      {value || "Data not available"}
    </span>
  </div>
);

const CheckRates = () => {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch("/api/banks");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setBanks(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setBanks([]);
      }
    };
    fetchBanks();
  }, []);

  if (banks.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg animate-pulse">
        Loading banks...
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-blue-50 via-green-100 to-green-200 py-16 min-h-screen font-inter">
      <div className="container mx-auto px-6 sm:px-10">
        {/* Main Content with Sticky Ads */}
        <div className="flex flex-col lg:flex-row gap-10 lg:items-start">
          {/* Sticky Ads */}
          <div className="lg:w-64 lg:sticky lg:top-8 lg:bottom-8 lg:h-fit lg:overflow-hidden lg:order-2">
            <Ads adId={1} />
          </div>

          {/* Section Heading and Bank Cards Grid */}
          <div className="flex-1 lg:order-1">
            {/* Section Heading */}
            <div className="relative text-center mb-14">
              <h1 className="pt-10 text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-b from-blue-800 to-blue-900 bg-clip-text text-transparent drop-shadow-md">
                Compare Home Loan Interest Rates
              </h1>
              <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-blue-900 mx-auto rounded-full mb-4 animate-pulse" />
              <p className="text-gray-700 font-semibold text-lg max-w-2xl mx-auto">
                Find the best offers from top banks and financial institutions.
              </p>

              {/* Subtle background glow */}
              <div className="absolute -z-10 inset-x-0 top-12 h-32 bg-gradient-to-r from-green-200/30 via-blue-100/40 to-transparent blur-3xl" />
            </div>

            {/* Bank Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {banks.map((bank) => (
                <div
                  key={bank.id}
                  className={`relative bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between 
                  hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-green-700/10
                  ${bank.bestOffer ? "ring-2 ring-green-500" : "ring-1 ring-gray-100"}`}
                >
                  {/* Best Offer Tag */}
                  {bank.bestOffer && (
                    <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                      Best Offer
                    </span>
                  )}

                  {/* Bank Logo and Name */}
                  <div className="flex items-center justify-center mb-4">
                    {logoMap[bank.name.toLowerCase()] ? (
                      <img
                        src={`/Banks/${logoMap[bank.name.toLowerCase()]}`}
                        alt={bank.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-contain shadow-md mr-3"
                      />
                    ) : (
                      <Building className="w-12 h-12 text-gray-500 mr-3" />
                    )}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                      {bank.name}
                    </h3>
                  </div>

                  {/* Info Rows */}
                  <div className="mb-5 space-y-1">
                    <InfoRow
                      label="Interest Rate"
                      value={bank.interestRate}
                      Icon={Percent}
                      color="text-green-700"
                    />
                    <InfoRow
                      label="Processing Fee"
                      value={bank.processingFee}
                      Icon={CreditCard}
                      color="text-blue-700"
                    />
                    <InfoRow
                      label="Max Tenure"
                      value={bank.tenure}
                      Icon={CalendarDays}
                      color="text-purple-700"
                    />
                  </div>

                  {/* Button */}
                  <Link
                    to="/eligibility-form"
                    className="mt-auto bg-gradient-to-r from-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white font-semibold py-1 rounded-lg transition-all duration-300 text-center text-sm sm:text-base"
                  >
                    Check Eligibility
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckRates;
