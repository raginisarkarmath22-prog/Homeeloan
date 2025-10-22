import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.1 }}
      className="bg-gradient-to-br from-green-900 to-green-950 text-white py-12 text-sm md:text-base shadow-xl relative z-0"
    >
      {/* optional subtle glowing gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(0,255,200,0.15),transparent_60%),radial-gradient(circle_at_70%_20%,rgba(0,180,255,0.15),transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-5 text-white">
              <img
                src="/src/assets/HomeLoan1.png"
                alt="HomeLoan Logo"
                className="h-18 w-auto drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
              />
            </div>
            <p className="text-gray-100 mb-6 leading-relaxed">
              Making homeownership dreams come true with competitive rates and
              exceptional service.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebookF />, href: "https://facebook.com" },
                { icon: <FaTwitter />, href: "https://twitter.com" },
                { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  whileHover={{
                    scale: 1.15,
                    boxShadow: "0px 0px 15px rgba(0,255,200,0.4)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-blue-500/20 to-green-400/20 border border-white/10 p-3 rounded-full text-white hover:from-green-400/30 hover:to-blue-500/30 transition-all duration-300"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Columns */}
          {[
            {
              title: "Loan Products",
              links: [
                { text: "Home Loan", href: "/" },
                { text: "Loan Against Property", comingSoon: true },
                { text: "Re-Finance", comingSoon: true },
                { text: "Commercial Loan", comingSoon: true },
              ],
            },
            {
              title: "Resources",
              links: [
                { text: "EMI Calculator", comingSoon: true },
                { text: "Eligibility Criteria", href: "/eligibility-form" },
                { text: "Blog", comingSoon: true },
                { text: "FAQs", comingSoon: true },
              ],
            },
            {
              title: "Company",
              links: [
                { text: "About Us", comingSoon: true },
                { text: "Our Team", comingSoon: true },
                { text: "Contacts", comingSoon: true },
                { text: "Reviews", comingSoon: true },
              ],
            },
          ].map((section, i) => (
            <motion.div key={i} variants={itemVariants} className="font-sans">
              <h3 className="text-white font-semibold text-xl mb-5 relative inline-block">
                {section.title}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    {link.href ? (
                      <Link
                        to={link.href}
                        className="text-gray-100 hover:text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-300 hover:font-medium"
                      >
                        {link.text}
                      </Link>
                    ) : (
                      <button
                        onClick={() => setShowComingSoon(true)}
                        className="text-gray-100 hover:text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-300 hover:font-medium"
                      >
                        {link.text}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Modal */}
        {showComingSoon && (
          <div className="fixed inset-0 bg-white/10 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h2>
              <p className="text-gray-600 mb-4">This feature is under development. Stay tuned!</p>
              <button
                onClick={() => setShowComingSoon(false)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://homeeloan.com/"
              className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 hover:opacity-80"
            >
              HomeeLoan.com
            </a>{" "}
            — Empowering your homeownership journey with trust and transparency.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item, i) => (
              <button
                key={i}
                onClick={() => setShowComingSoon(true)}
                className="hover:text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-300"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
