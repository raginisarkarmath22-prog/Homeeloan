import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import downArrow from "../assets/down-arrow.svg";
import homeLoan from "../assets/HomeLoan.png";
import {
  FaWhatsapp,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

function Navbar() {
   const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState({
    homeLoans: false,
    iwantto: false,
    resources: false,
  });
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const banks = [
    {
      name: "State Bank of India (SBI)",
      path: "/calculator/sbi",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/1200px-SBI-logo.svg.png",
    },
    {
      name: "HDFC Bank",
      path: "/calculator/hdfc",
      logo: "https://th.bing.com/th/id/OIP.bSdCrOLtTnXxO3qCc5BydgHaHZ?rs=1&pid=ImgDetMain",
    },
    {
      name: "ICICI Bank",
      path: "/calculator/icici",
      logo: "https://th.bing.com/th/id/OIP.9-GVZvi4loqfOpZcgDSUlgHaIB?w=1388&h=1505&rs=1&pid=ImgDetMain",
    },
    {
      name: "Axis Bank",
      path: "/calculator/axis",
      logo: "https://flyclipart.com/thumbs/axis-bank-logo-axis-mutual-fund-1546647.png",
    },
    {
      name: "Punjab National Bank (PNB)",
      path: "/calculator/pnb",
      logo: "https://th.bing.com/th/id/OIP.oZMC6Q9DBNfP7T8qjoxbJgHaHf?rs=1&pid=ImgDetMain",
    },
  ];

  const toggleSubMenu = (menu) => {
    setExpanded((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed w-full shadow-2xl bg-green-200/90 text-black py-4 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 justify-start col-span-1">
         <img
  src={homeLoan}
  alt="Logo"
  className="absolute h-50 md:h-60 sm:-ml-5 -ml-5 md:-ml-11 w-auto"
/>

        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden xl:flex space-x-4 font-serif items-center justify-center col-span-1 ml-16">
          <li className="cursor-pointer text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-800 hover:to-green-800 transition-all duration-300">Home Loans</li>

          <li className="relative group cursor-pointer">
            <div className="flex items-center gap-1">
              <span className="text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-800 hover:to-green-800 transition-all duration-300">Banks</span>
              <img
                src={downArrow}
                alt="Down Arrow"
                className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
              />
            </div>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute bg-gradient-to-b from-green-200 to-blue-200 top-full left-0 mt-2 rounded-lg shadow-xl w-60 p-4 z-50 border border-gray-200 transition-all duration-300">
              <p className="font-semibold mb-2 text-black">Choose Your Bank</p>
              <ul className="space-y-3">
                {banks.map((bank) => (
                  <li key={bank.path}>
                    <Link
                      to={bank.path}
                      className="flex items-center p-2 rounded hover:bg-blue-50 transition-all"
                    >
                      <img
                        src={bank.logo}
                        alt={`${bank.name} logo`}
                        className="w-6 h-6 mr-3 object-contain"
                      />
                      <span className="text-gray-800 hover:text-blue-900">
                        {bank.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="relative group cursor-pointer">
            <div className="flex items-center gap-1">
              <span className="text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-800 hover:to-green-800 transition-all duration-300">I want to</span>
              <img
                src={downArrow}
                alt="Down Arrow"
                className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
              />
            </div>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute bg-gradient-to-b from-green-200 to-blue-200 top-full left-0 mt-2 rounded-lg shadow-xl w-48 p-4 z-50 border border-gray-200 transition-all duration-300">
              <ul className="space-y-2">
                <li>
                  <Link to="/apply-now" className="block text-gray-800 hover:text-blue-900 hover:bg-blue-50 p-2 rounded">
                    Apply Now
                  </Link>
                </li>
                <li>
                  <Link to="/eligibility-form" className="block text-gray-800 hover:text-blue-900 hover:bg-blue-50 p-2 rounded">
                    Check Eligibility
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="cursor-pointer"><button onClick={() => navigate("/eligibility-form")} className="text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-800 hover:to-green-800 transition-all duration-300">Approved projects</button></li>
          <li className="cursor-pointer text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-800 hover:to-green-800 transition-all duration-300"><Link to="/help-center">Help Center</Link></li>
          <li className="cursor-pointer text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-800 hover:to-green-800 transition-all duration-300"><Link to="/compare-loans">Compare Loan</Link></li>
        </ul>

        {/* Right-side icons */}
        <div className="flex items-center justify-end gap-6 md:gap-10 text-sm md:text-lg font-medium col-span-1">
          {/* WhatsApp */}
          <a href="https://wa.me/6026026026" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:cursor-pointer hover:scale-105 transition-transform duration-200">
            <FaWhatsapp className="text-green-500 text-2xl rotate-360 md:text-2xl " />
            <span className="text-sm md:text-base font-medium hover:font-semibold md:block hidden">602-602-6026</span>
          </a>

          {/* Login */}
          <Link
            to="/login"
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-green-900 font-semibold md:block hidden hover:scale-105 transition-all duration-300"
          >
            LOGIN
          </Link>

          {/* User Icon */}
          <Link to="/login">
            <FaUserCircle className="text-2xl md:text-4xl hover:text-blue-400 text-green-600 cursor-pointer" />
          </Link>

          {/* Hamburger */}
          <button
            className="text-xl xl:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40  bg-opacity-50"
          onClick={() => setMobileMenuOpen(false)}
        >
            <div
            className="fixed right-0 top-0 w-[60%]  max-w-xs h-[60vh] bg-white text-black p-5 shadow-lg rounded-l-4xl z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="flex justify-end items-center mb-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl text-blue-950 hover:text-red-500 transition-colors duration-200"
              >
                <FaTimes />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <ul className="space-y-4 text-base">
              {/* Accordion - Home Loans */}
              <li>
                <button
                  onClick={() => toggleSubMenu("homeLoans")}
                  className="flex justify-between w-full items-center"
                >
                  Home Loans
                  <span>
                    {expanded.homeLoans ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>
                {expanded.homeLoans && (
                  <ul className="pl-4 mt-1 space-y-1">
                    {banks.map((bank) => (
                      <li key={bank.path}>
                        <Link
                          to={bank.path} // This now correctly points to /calculator/:bank
                          className="block text-blue-700 hover:underline"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {bank.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Accordion - I want to */}
              <li>
                <button
                  onClick={() => toggleSubMenu("iwantto")}
                  className="flex justify-between w-full items-center py-1"
                >
                  I want to
                  <span>{expanded.iwantto ? <FaChevronUp /> : <FaChevronDown />}</span>
                </button>
                {expanded.iwantto && (
                  <ul className="pl-4 mt-1">
                    <li className="py-1">Apply Now</li>
                    <li className="py-1">
                      <Link to="/eligibility-form" onClick={() => setMobileMenuOpen(false)} className="block text-blue-700 hover:underline">
                        Check Eligibility
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Accordion - Resources */}
              <li>
                <button
                  onClick={() => toggleSubMenu("resources")}
                  className="flex justify-between w-full items-center py-1"
                >
                  Resources
                  <span>{expanded.resources ? <FaChevronUp /> : <FaChevronDown />}</span>
                </button>
                {expanded.resources && (
                  <ul className="pl-4 mt-1">
                    <li className="py-1">Blogs</li>
                    <li className="py-1">FAQs</li>
                  </ul>
                )}
              </li>

              <li className="pt-2">FAQ</li>
              <li className="pt-2">About us</li>
              <li className="pt-2">Get in touch</li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
