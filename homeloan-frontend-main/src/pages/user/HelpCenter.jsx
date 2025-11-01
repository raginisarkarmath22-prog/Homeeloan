import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaSpinner, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const HelpCenter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const formFields = [
    { key: 'firstName', label: 'First Name', type: 'text', placeholder: 'John' },
    { key: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
    { key: 'phone', label: 'Phone', type: 'tel', placeholder: '(+91) 0123-456789' },
    { key: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell us about your home loan needs...' }
  ];

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-26 bg-gradient-to-r from-green-200 via-green-100 to-green-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center font-serif mb-2 text-green-950 tracking-wide">
          Help Center
        </h1>
        <p className="text-center text-gray-700 text-m font-medium mb-8">
          Connecting You to Hassle-Free Home Loans.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information Section */}
          <motion.div
            className="relative mt-24 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-blue-950 via-blue-900 to-blue-900 overflow-hidden h-fit self-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Solid background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-900 rounded-2xl border border-white/30"></div>

            {/* Content */}
            <div className="relative p-5 z-10 space-y-4 font-serif">
              <h3 className="text-2xl font-extrabold text-white text-center drop-shadow-md tracking-wide">
                Contact Information
              </h3>

              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-lg font-semibold text-white">Phone</p>
                  <a href="https://wa.me/916026026026" target="_blank" rel="noopener noreferrer" className="text-gray-100 font-sans hover:text-blue-300">(+91) 602-602-602-6</a>
                </div>

                <div className="text-center">
                  <p className="text-lg font-semibold text-white">Email</p>
                  <a href="mailto:info@homeeloan.com" className="text-gray-100 underline hover:text-blue-300">info@homeeloan.com</a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-4 text-center border-t border-white/30 pt-4">
                <h4 className="text-lg font-bold text-white">Business Hours</h4>
                <p className="text-gray-100 text-sm">Monday - Saturday: 10:00 AM - 7:00 PM</p>
              </div>
            </div>
          </motion.div>

          {/* Send Us a Message Section */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg border-1 border-black"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-extrabold font-serif text-xl mb-4 text-center">Send Us a Message</h2>
            <p className="text-gray-700 mb-6 text-sm font-semibold text-center">
              Fill out the form below and we&apos;ll get back to you within 24 hours
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {formFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-black font-bold mb-1 text-sm">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      rows="3"
                      placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="w-full px-3 py-2 border rounded-md font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    />
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="w-full border-0 border-b-2 border-gray-700 text-medium font-medium focus:outline-none focus:border-blue-500 bg-transparent py-2 text-sm"
                      required
                    />
                  )}
                </div>
              ))}

              <div className="mt-6">
                <motion.button
                  type="submit"
                  className="bg-black text-white py-3 px-6 rounded-md text-sm font-bold hover:bg-white hover:text-black border border-black transition-all duration-300 flex items-center gap-2 w-full justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </div>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center text-green-600 font-bold mt-4 text-sm"
                  >
                    ✅ Message sent successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
