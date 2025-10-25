import React, { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaSpinner, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";


// Lottie animation data (you can replace with actual JSON files)
const phoneAnimation = {
  v: "5.7.1",
  meta: { g: "LottieFiles AE 0.1.20" },
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Phone",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Phone Outlines",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [100, 100, 0], ix: 2 },
        a: { a: 0, k: [100, 100, 0], ix: 1 },
        s: { a: 0, k: [100, 100, 100], ix: 6 }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ind: 0,
              ty: "sh",
              ix: 1,
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0], [0, 0]],
                  v: [[-50, -50], [50, -50], [50, 50], [-50, 50]],
                  c: true
                },
                ix: 2
              },
              nm: "Path 1",
              mn: "ADBE Vector Shape - Group",
              hd: false
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.2, 0.8, 0.4, 1], ix: 4 },
              o: { a: 0, k: 100, ix: 5 },
              r: 1,
              bm: 0,
              nm: "Fill 1",
              mn: "ADBE Vector Graphic - Fill",
              hd: false
            }
          ],
          nm: "Phone",
          np: 2,
          cix: 2,
          bm: 0,
          ix: 1,
          mn: "ADBE Vector Group",
          hd: false
        }
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0
    }
  ]
};

const emailAnimation = {
  v: "5.7.1",
  meta: { g: "LottieFiles AE 0.1.20" },
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Email",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Email Outlines",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [100, 100, 0], ix: 2 },
        a: { a: 0, k: [100, 100, 0], ix: 1 },
        s: { a: 0, k: [100, 100, 100], ix: 6 }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ind: 0,
              ty: "sh",
              ix: 1,
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0], [0, 0]],
                  v: [[-50, -30], [50, -30], [50, 30], [-50, 30]],
                  c: true
                },
                ix: 2
              },
              nm: "Path 1",
              mn: "ADBE Vector Shape - Group",
              hd: false
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.8, 0.2, 0.4, 1], ix: 4 },
              o: { a: 0, k: 100, ix: 5 },
              r: 1,
              bm: 0,
              nm: "Fill 1",
              mn: "ADBE Vector Graphic - Fill",
              hd: false
            }
          ],
          nm: "Envelope",
          np: 2,
          cix: 2,
          bm: 0,
          ix: 1,
          mn: "ADBE Vector Group",
          hd: false
        }
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0
    }
  ]
};

const Feedback = ({ openCardSignal, onCardClose }) => {
  return (
    <>
      {/* Main Section */}
      <section className="relative py-8 px-6 md:px-12 overflow-hidden bg-gradient-to-r from-green-200 via-green-100 to-green-200">
        <FeedbackContent openCardSignal={openCardSignal} onCardClose={onCardClose} />
      </section>
    </>
  );
};

const FeedbackContent = ({ openCardSignal, onCardClose }) => {
  const [expandedCard, setExpandedCard] = useState(null);
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

  const handleCardClick = (cardType) => {
    setExpandedCard(expandedCard === cardType ? null : cardType);
  };

  // If parent signals to open a specific card, sync it to local state
  useEffect(() => {
    if (openCardSignal) {
      setExpandedCard(openCardSignal);
    }
  }, [openCardSignal]);

  // Notify parent when the modal is closed
  useEffect(() => {
    if (expandedCard === null && typeof onCardClose === 'function') {
      onCardClose();
    }
  }, [expandedCard, onCardClose]);

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
    <>
      {/* Background image with opacity */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-gray-100/10"></div>

      {/* Foreground content */}
      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold text-center font-serif mb-4 text-black tracking-wide">
          Get in Touch
        </h2>
        <p className="text-center text-gray-700 mb-8 font-mono text-lg font-semibold">
          Ready to start your home loan journey? Contact us today
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-8 max-w-4xl mx-auto">
          {/* Contact Information Card */}
          <motion.div
            className="w-full max-w-sm h-24 rounded-2xl shadow-lg bg-gradient-to-r from-blue-700 via-blue-900 to-blue-800 cursor-pointer flex items-center justify-center text-white font-bold text-lg border border-gray-800/30"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ y: 0 }}
            onClick={() => handleCardClick('contact')}
          >
            Contact Information
          </motion.div>

          {/* Send Us a Message Card */}
          <motion.div
            className="w-full max-w-sm h-24 rounded-2xl shadow-lg bg-white text-black border-2 border-black cursor-pointer flex items-center justify-center font-bold text-lg border border-gray-800/30"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ y: 0 }}
            onClick={() => handleCardClick('message')}
          >
            Send Us a Message
          </motion.div>
        </div>

        {/* Popup Modal */}
        <AnimatePresence>
          {expandedCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onClick={() => setExpandedCard(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl w-full mx-4 z-[1001]"
                onClick={(e) => e.stopPropagation()}
              >
                {expandedCard === 'contact' && (
                  <motion.div
                    className="relative p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-900 overflow-hidden max-w-sm mx-auto"
                    whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  >
                    {/* Close button */}
                    <button
                      onClick={() => setExpandedCard(null)}
                      className="absolute top-4 left-4 z-20 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-1"
                    >
                      <FaTimes size={24} />
                    </button>

                    {/* Solid background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-900 rounded-2xl border border-white/30"></div>

                    {/* Content */}
                    <div className="relative z-10 space-y-6 font-serif">
                      <h3 className="text-2xl font-extrabold text-white text-center drop-shadow-md tracking-wide">
                        Contact Information
                      </h3>

                      <div className="space-y-4">
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
                )}
                {expandedCard === 'message' && (
                  <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto relative max-h-96 overflow-y-auto">
                    {/* Close button */}
                    <button
                      onClick={() => setExpandedCard(null)}
                      className="absolute top-2 left-2 text-black hover:text-gray-600 transition-colors"
                    >
                      <FaTimes size={20} />
                    </button>

                    <h2 className="font-extrabold font-serif text-xl mb-2 mt-6">Send Us a Message</h2>
                    <p className="text-gray-700 mb-4 text-sm font-semibold">
                      Fill out the form below and we&apos;ll get back to you within 24 hours
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
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

                      <div className="mt-3">
                        <motion.button
                          type="submit"
                          className="bg-black text-white py-2 px-4 rounded-md text-sm font-bold hover:bg-white hover:text-black border border-black transition-all duration-300 flex items-center gap-2"
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
                            className="text-center text-green-600 font-bold mt-3 text-sm"
                          >
                            ✅ Message sent successfully!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Feedback;