import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import applyOnlineImg from "../assets/HowItWorks/applyOnline.jpeg";
import preApprovedImg from "../assets/HowItWorks/GetPre-Approved.jpeg";
import chooseLoanImg from "../assets/HowItWorks/ChooseYourLoan.jpeg";
import getFundedImg from "../assets/HowItWorks/GetFunded.jpeg";

const steps = [
  {
    id: 1,
    title: "Apply Online",
    description: "Finish your home loan application in just 10 minutes!",
    image: applyOnlineImg,
  },
  {
    id: 2,
    title: "Get Pre-Approved",
    description:
      "Instant eligibility check with zero effect on your credit score",
    image: preApprovedImg,
  },
  {
    id: 3,
    title: "Choose Your Loan",
    description:
      "Compare different loan plans and choose what suits you best.",
    image: chooseLoanImg,
  },
  {
    id: 4,
    title: "Get Funded",
    description:
      "Once approved, the amount is credited without delay—fast and seamless.",
    image: getFundedImg,
  },
];

const LoanApproved = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0.3, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.5, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center py-16 px-6 bg-gradient-to-b from-green-50 to-white overflow-visible"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-12">
        How It Works
      </h2>

      {/* Neon Line (desktop) */}
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: "100%" } : {}}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="absolute hidden lg:block top-[52%] left-0 h-[3px] rounded-full bg-gradient-to-r from-green-400 via-green-700 to-green-400 z-0"
        style={{
          boxShadow:
            "0 0 20px rgba(72, 255, 139, 0.6), 0 0 40px rgba(72, 255, 139, 0.4)",
        }}
      />

      {/* Glowing Light Dot (desktop) */}
      <motion.div
        initial={{ left: "0%" }}
        animate={inView ? { left: "100%" } : {}}
        transition={{ duration: 3.2, ease: "easeInOut" }}
        className="absolute hidden lg:block top-[51%] w-4 h-4 rounded-full bg-white z-10"
        style={{
          boxShadow:
            "0 0 15px 5px rgba(255,255,255,0.9), 0 0 25px 10px rgba(255,255,255,0.6)",
          filter: "blur(1px)",
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full rounded-full bg-white"
        />
      </motion.div>

      {/* Cards */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl z-10">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={controls}
            className="relative bg-white rounded-2xl shadow-xl border border-green-800/30 p-6 overflow-hidden 
              transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="absolute -top-5 right-4 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-green-800 mt-10 mb-2">
              {step.id}. {step.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile Line & Dot (behind cards) */}
      <div className="lg:hidden absolute top-[22%] left-0 w-full h-[70%] flex justify-center items-center pointer-events-none z-0">
        {/* Neon vertical line */}
        <motion.div
          initial={{ height: 0 }}
          animate={inView ? { height: "100%" } : {}}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="w-[5px] rounded-full bg-gradient-to-b from-green-400 via-green-500 to-green-700"
          style={{
            boxShadow:
              "0 0 20px rgba(72, 255, 139, 0.6), 0 0 40px rgba(72, 255, 139, 0.4)",
          }}
        />

        {/* Glowing dot */}
        <motion.div
          initial={{ top: "0%" }}
          animate={inView ? { top: "100%" } : {}}
          transition={{ duration: 3.2, ease: "easeInOut" }}
          className="absolute w-5 h-5 rounded-full bg-white"
          style={{
            boxShadow:
              "0 0 15px 5px rgba(255,255,255,0.9), 0 0 25px 10px rgba(255,255,255,0.6)",
            filter: "blur(0.5px)",
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full rounded-full bg-white"
          />
        </motion.div>
      </div>

      {/* Apply Now Button */}
      <div className="flex justify-center mt-12 z-10">
        <Link to="/apply-now" className="bg-green-700 hover:bg-green-700 text-white font-semibold py-1.5 px-5 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default LoanApproved;
