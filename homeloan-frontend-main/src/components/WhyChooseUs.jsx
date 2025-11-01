import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// SVG Icons as React Components
const FastApprovalIcon = () => (
  <motion.svg
    className="w-12 h-12 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 200 }}
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path>
  </motion.svg>
);

const CompetitiveRatesIcon = () => (
  <motion.svg
    className="w-12 h-12 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 200 }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.7 8l-5.1 5.1-2.8-2.8L7 14.2"></path>
  </motion.svg>
);

const ExpertSupportIcon = () => (
  <motion.svg
    className="w-12 h-12 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 200 }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </motion.svg>
);

// Feature Cards Data
const features = [
  {
    title: "Fast Approval",
    subtitle: "Get pre-approved in as little as 24 hours",
    description: "Our streamlined process makes getting your home loan approval quick and hassle-free.",
    icon: <FastApprovalIcon />,
    gradient: "from-green-900 to-green-950 bg-gradient-to-r animate-gradient-x",
    border: "border-blue-200",
    button: "bg-green-900 hover:bg-green-950",
    textColor: "text-blue-100",
    buttonText: "Apply Now",
  },
  {
    title: "Competitive Rates",
    subtitle: "Lowest interest rates tailored for you",
    description: "We offer some of the most competitive interest rates in the market to make your loan affordable.",
    icon: <CompetitiveRatesIcon />,
    gradient: "from-green-900 to-green-950 bg-gradient-to-r animate-gradient-x",
    border: "border-green-200",
    button: "bg-green-900 hover:bg-green-950",
    textColor: "text-green-100",
    buttonText: "Check Rates",
  },
  {
    title: "Expert Support",
    subtitle: "Guidance from experienced professionals",
    description: "Our experienced loan officers guide you through every step of the home loan process.",
    icon: <ExpertSupportIcon />,
    gradient: "from-green-900 to-green-950 bg-gradient-to-r animate-gradient-x",
    border: "border-green-200",
    button: "bg-green-900 hover:bg-green-950",
    textColor: "text-green-100",
    buttonText: "Get Help",
  },
];

const WhyChooseUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  // ✨ Added soft blur & scale for premium reveal
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.98, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic ease like Apple
      },
    },
  };

  return (
    <section className="py-12 bg-from-green-200 to blue-200 font-inter">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold font-serif text-black">Why Choose Us?</h2>
        <p className="text-xl mt-3 text-gray-800">
          We're committed to making your home buying journey smooth and successful
        </p>
      </div>

      <motion.div
        className="max-w-7xl mx-auto grid gap-8 px-4 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`bg-white rounded-xl shadow-lg overflow-hidden border ${feature.border} transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full`}
            variants={cardVariants}
            whileHover={{
              y: -8,
              boxShadow: "0px 12px 30px rgba(0,0,0,0.1)",
            }}
          >
            <div className={`bg-gradient-to-r ${feature.gradient} p-6 text-center relative overflow-hidden`}>
              <div className="bg-white/30 backdrop-blur-sm rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-white text-2xl font-bold mb-1 drop-shadow-lg">{feature.title}</h3>
              <p className={`${feature.textColor} text-sm drop-shadow-md`}>{feature.subtitle}</p>
            </div>
            <div className="p-6 bg-white flex flex-col flex-grow">
              <p className="text-gray-700 text-center mb-4 flex-grow">{feature.description}</p>
              {feature.buttonText === "Apply Now" ? (
                <Link
                  to="/apply-now"
                  className={`w-full ${feature.button} text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center hover:scale-105 shadow-md hover:shadow-lg`}
                >
                  <span>{feature.buttonText}</span>
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              ) : feature.buttonText === "Get Help" ? (
                <Link
                  to="/help-center"
                  className={`w-full ${feature.button} text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center hover:scale-105 shadow-md hover:shadow-lg`}
                >
                  <span>{feature.buttonText}</span>
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              ) : (
                <Link
                  to="/check-rates"
                  className={`w-full ${feature.button} text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center hover:scale-105 shadow-md hover:shadow-lg`}
                >
                  <span>{feature.buttonText}</span>
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
