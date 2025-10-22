import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import CalculatorForm from "../../components/CalculatorForm";
import LoanStepsTimeline from "../../components/LoanStepsTimeline";
import EMIChart from "../../components/EMIChart";
import useEMICalculator from "../../hooks/useEMICalculator";
import HomeLoanEMICalculator from "../../components/HomeLoanEMICalculator";
import { FaFileAlt, FaCreditCard, FaHome, FaCheckCircle } from "react-icons/fa";
import {
  FaRegClock,
  FaRupeeSign,
  FaShieldAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Scroll from "../../components/ScrollingBanks";
import percentageVideo from "../../assets/percentage_video.mp4";
import LoanOptionsTabs from "../../components/LoanOptionsTabs";
import CompareLoan from "./ComparedLoan";
import Accordion from "../../components/faq";
import Feedback from "../../components/Feedback";
import LoanApproved from "../../components/HowItWorks";
import Index from "../../components/HomeIndex";
import WhyChooseUs from "../../components/WhyChooseUs";
import SmartLoanHero from "../../components/SmartLoanHero";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";

function Home() {
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const res = await fetch("https://31.97.226.15/api/seo/home");
        const data = await res.json();
        setSeoData(data); // ✅ not data[0]
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      }
    };

    fetchSeoData();
  }, []);

  return (
    // seo section

    <>
      {/* ----------------------------------------------------------------------------------------- */}
      {seoData && (
        <Helmet>

          {/* Dynamic meta tags */}
          <title>{seoData.meta_title}</title>
          <meta name="description" content={seoData.meta_description} />

          {/* Dynamic JSON-LD Schema from DB */}
          {seoData.schema_json && (
            <script type="application/ld+json">
              {JSON.stringify(seoData.schema_json)}
            </script>
          )}
        </Helmet>
      )}
      {/* ------------------------------------------------------------------------------- */}
      <main className="bg-gradient-to-r from-green-100 to-blue-100">
        {/* Hero Section */}
        <Index />

        {/* Instant Loans from Top Banks */}
        <div className="text-center p-6 bg-white/10 shadow rounded-2xl font-serif">
          <h2 className="text-xl sm:text-2xl md:text-3xl  font-bold text-gray-900">
            Instant Loans from Top Banks
          </h2>
          <p className="text-sm sm:text-base mt-2 text-gray-500 mb-5 max-w-[90%] md:max-w-[70%] mx-auto">
            Pick a bank to unlock personalized home loan offers. From comparing
            interest rates to final approval — we coordinate every step.
          </p>
          <div className="relative w-[97%] max-w-[1200px] mx-auto  py-4 px-4 bg-[#56b5c032] lg:bg-[linear-gradient(at_right,_#7ca3ac,_#F5F8F5FF,_#066233)] rounded-full overflow-hidden">
            {/* Main scrolling area */}
            <div className="relative z-10 mx-auto w-[82.5%] md:w-[92%] md:right-[5%] right-[10%] bg-transparent rounded-full overflow-hidden">
              <Scroll />
            </div>
            {/* Right capsule that holds image/video */}
            <div className="absolute  right-[0.6%] top-1/2 -translate-y-1/2 w-[37%] md:w-[14%] h-[60px] sm:w-[150px] sm:h-[58px]  bg-gradient-to-bl bg-[#ccffff] lg:bg-gradient-to-bl lg:from-[#c5cbc8] lg:to-[#ccfbf1] rounded-full  z-0 overflow-hidden flex items-center justify-center">
              <img
                src="H_ormbg.png"
                alt="Robot"
                className="hidden lg:block absolute left-[43px] top-[-55px] h-[180px] w-auto"
              />

              {/* Video for <1200px */}
              <video
                src={percentageVideo}
                autoPlay
                loop
                muted
                playsInline
                className="block lg:hidden w-[33%] ml-[25%] h-full object-cover  rounded-full"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            {/* Right edge capsule (pill tail) */}
            <div className="absolute right-[20.5%] md:right-[10%] top-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-[#1c4d4c1d] rounded-[99%/100%] " />{" "}
            {/*  rounded-[99%/100%]*/}
          </div>
        </div>

        {/* LoanOptionTab */}
        <SmartLoanHero />

        <LoanStepsTimeline currentStep={2} />

        <CompareLoan />
        {/* Bulletins of Banks  */}

        {/* EMI Calculator Section */}
        <HomeLoanEMICalculator />
        <LoanApproved />
        <Accordion />
        <WhyChooseUs />
        <Feedback />
        <Footer />
      </main>
    </>
  );
}

export default Home;
