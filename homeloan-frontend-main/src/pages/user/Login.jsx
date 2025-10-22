import React, { useState } from "react";
import loginImg from "../../assets/1.webp";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      <div className="flex flex-col md:flex-row bg-pink-10 min-h-screen">
        {/* Left image panel */}
        <div
          className="hidden md:block w-1/2 bg-center bg-cover relative"
          style={{ backgroundImage: `url(${loginImg})` }}
        >
          <div className="absolute bottom-7 font-semibold bg-black opacity-70 text-amber-100 p-6 w-3/4">
            <h3 className="text-2xl mb-2">Security Reminder</h3>
            <p className="text-sm">
              Ensure you’re logging in from a secure device. <br />
              Never share your credentials with anyone. <br />
              For support call <strong>911</strong> (Mon–Fri, 8:30AM–5:30PM AEST).
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full">
            <div className="flex flex-col items-center mb-7">
              <img src="/H.png" alt="Logo" className="h-16 max-w-[250px] mx-auto mb-4" />
              <h2 className="mt-4 text-xl font-semibold text-center">
                LoanApp Login
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 flex flex-col items-center"
            >
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={formData.email}
                onChange={handleChange}
                className="w-4/5 border-0 border-b border-gray-500 focus:outline-none focus:border-blue-500 bg-transparent py-2"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-4/5 border-0 border-b border-gray-500 focus:outline-none focus:border-blue-500 bg-transparent py-2"
                required
              />

              <div className="w-4/5 flex justify-between text-sm text-blue-500">
                <a href="/forgot-password" className="hover:underline">
                  Forgot Password?
                </a>
                 <div>
                <p className="text-sm text-gray-500 ">
                  Don't have an account?{" "}
                  <a href="/register" className="text-blue-500">
                    Register here
                  </a>
                  .
                </p>
              </div>
              </div>

              <div className="flex items-center justify-center gap-10 mt-7 space-x-7 ">
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center w-full px-4 py-2  text-sm font-bold bg-green-300 leading-6 capitalize duration-100 transform  shadow cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1 rounded-2xl"
                >
                  Login
                </button>
               
              </div>

              <div className="mt-6 ml-6 w-full text-left">
                <a href="/help" className="block text-base text-gray-800 hover:underline">
                  Online Help
                </a>
                <a href="/contact" className="block text-base text-gray-800 hover:underline">
                  Contact us
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer>
        <div className="bg-gray-200 text-black text-center py-5 mt-2">
          <p className="text-sm">© 2023 LoanZone. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Login;