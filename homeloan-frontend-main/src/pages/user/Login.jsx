import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import loginImg from "../../assets/1.png";
import percentageVideo from "../../assets/percentage_video.mp4";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted:", formData);
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 to-green-100" style={{ backgroundImage: `url(${loginImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Cross sign */}
        <div className="absolute top-4 right-4 z-20">
          <span
            className="text-green-900 font-semibold text-2xl cursor-pointer hover:text-green-700 transition-colors duration-300"
            onClick={() => navigate('/')}
          >
            ×
          </span>
        </div>

        <div className="flex flex-col md:flex-row min-h-screen md:min-h-screen relative z-10">
          {/* Left image panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block w-1/2 bg-center bg-cover relative"
            style={{ backgroundImage: `url(${loginImg})` }}
          >
            <div className="absolute bottom-7 font-semibold bg-black opacity-70 text-amber-100 p-6 w-3/4 rounded-lg shadow-lg">
              <h3 className="text-2xl mb-2">Security Reminder</h3>
              <p className="text-sm">
                Ensure you’re logging in from a secure device. <br />
                Never share your credentials with anyone. <br />
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 min-h-screen md:min-h-0"
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
                className="space-y-4 flex flex-col items-center"
              >
                <motion.div
                  className="w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.input
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 text-gray-800 placeholder-gray-500"
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </motion.div>

                <motion.div
                  className="w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 text-gray-800 placeholder-gray-500"
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </motion.div>

                <div className="w-full flex flex-col sm:flex-row justify-between text-sm">
                  <a href="/forgot-password" className="text-green-900 hover:text-green-500 hover:underline mb-2 sm:mb-0">
                    Forgot Password?
                  </a>
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <a href="/register" className="text-green-900 hover:text-green-500 hover:underline">
                      Register here
                    </a>
                    .
                  </p>
                </div>

                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-800 via-green-700 to-green-900 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>

                <div className="w-full flex justify-between">
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

export default Login;