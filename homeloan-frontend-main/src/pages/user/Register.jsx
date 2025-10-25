import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import regimg from "../../assets/1.png";
import percentageVideo from "../../assets/percentage_video.mp4";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("http://31.97.226.15/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(data.message || "Registered successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          dob: "",
          mobile: "",
          email: "",
          password: "",
        });
      } else {
        setErrorMessage(data.error || "Registration failed.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setErrorMessage("Server error. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 to-green-100" style={{ backgroundImage: `url(${regimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Cross sign */}
        <div className="absolute top-4 right-4 z-20">
          <span
            className="text-green-900 font-semibold text-2xl cursor-pointer hover:text-green-700 transition-colors duration-300"
            onClick={() => navigate('/')}
          >
            ×
          </span>
        </div>

        <div className="flex flex-col md:flex-row min-h-screen relative z-10">
          {/* Left image Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block w-1/2 bg-center bg-cover relative"
            style={{ backgroundImage: `url(${regimg})` }}
          >
            <div className="absolute bottom-7 font-semibold bg-black opacity-70 text-amber-100 p-6 w-3/4 rounded-lg shadow-lg">
              <h3 className="text-2xl mb-2">Security reminder</h3>
              <p className="text-sm">
                Don't sign in if you are sharing access to your computer. <br />
                Never share your security codes or passwords with anyone. <br />
               
              </p>
            </div>
          </motion.div>

          {/* Right Form Panel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-16"
          >
            <div className="w-full max-w-md bg-white/80 md:bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="flex items-center justify-center mb-8">
                <motion.video
                  src={percentageVideo}
                  alt="Logo Video"
                  className="h-16 max-w-[250px] mr-4 rounded-full"
                  autoPlay
                  loop
                  muted
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.h2
                  className="text-2xl sm:text-5xl font-bold bg-gradient-to-r from-green-800 via-green-700 to-green-900 bg-clip-text text-transparent font-serif"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Homeeloan
                </motion.h2>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-3 flex flex-col items-center"
              >
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <motion.div
                    className="w-full sm:w-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 text-gray-800 placeholder-gray-500"
                      required
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </motion.div>
                  <motion.div
                    className="w-full sm:w-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 text-gray-800 placeholder-gray-500"
                      required
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </motion.div>
                </div>
                {[
                  { name: "dob", placeholder: "Date of Birth", type: "date" },
                  { name: "mobile", placeholder: "Mobile Number (e.g. +91-412345678)", type: "tel", required: true },
                  { name: "email", placeholder: "Email ID", type: "email", required: true },
                  { name: "password", placeholder: "Password", type: "password", required: true },
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 text-gray-800 placeholder-gray-500"
                      required={field.required}
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </motion.div>
                ))}

                <div className="flex flex-col sm:flex-row gap-4 w-full mt-6">
                  <motion.button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-800 to-green-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-700 to-green-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </div>

                <motion.div
                  className="w-full mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  {successMessage && (
                    <motion.p
                      className="text-green-600 bg-teal-100 px-4 py-2 rounded-lg text-center text-sm shadow-md"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {successMessage}
                    </motion.p>
                  )}
                  {errorMessage && (
                    <motion.p
                      className="text-red-600 bg-rose-100 px-4 py-2 rounded-lg text-center text-sm shadow-md"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </motion.div>

                <div className="w-full text-center mt-1">
                  <p className="text-xs text-gray-600">
                    By clicking Register, you agree to our{" "}
                    <a href="#" className="text-green-900 hover:text-green-500 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-green-900 hover:text-green-500 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Already have an account?{" "}
                    <a href="/login" className="text-green-900 hover:text-green-500 hover:underline">
                      Login here
                    </a>
                    .
                  </p>
                </div>

                <div className="w-full flex justify-between mt-1">
                  <a href="/help" className="text-gray-700 hover:text-gray-900 hover:underline">
                    Online Help
                  </a>
                  <a href="/contact" className="text-gray-700 hover:text-gray-900 hover:underline">
                    Contact us
                  </a>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="bg-gray-200 text-black text-center py-5">
        <p className="text-sm">© 2023 LoanZone. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Register;
