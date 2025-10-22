import React, { useState } from "react";
import { Link } from "react-router-dom";
import regimg from "../../assets/1.webp";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    dob: "",
    mobile: "",
    email: "",
    password: "", // ✅ Add this
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Clear previous messages
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
          name: "",
          surname: "",
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
    setFormData({
      name: "",
      surname: "",
      dob: "",
      mobile: "",
      email: "",
    });
  };

  // (Rest of your component JSX goes here)
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className=" flex flex-col md:flex-row bg-pink-10 flex-grow">
          {/* Left image Panel */}
          <div
            className="hidden md:block w-1/2 bg-center bg-cover relative"
            style={{ backgroundImage: `url(${regimg})` }}
          >
            <div className="absolute bottom-7 font-semibold bg-black opacity-70 text-amber-100 p-6 w-3/4">
              <h3 className="text-2xl  mb-2">Security reminder</h3>
              <p className="text-sm">
                Don't sign in if you are sharing access to your computer. <br />
                Never share your security codes or passwords with anyone. <br />
                For assistance call us on <strong>911</strong> Monday to Friday
                between 8:30AM and 5:30PM AEST.
              </p>
            </div>
          </div>
          {/*RightForm pannel*/}

          {/* Right Form Panel */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8 ">
            <div className="w-full">
              <div className="flex flex-col items-center mb-7">
                <img
                  src="/H.png"
                  alt=" Logo"
                  className="h-15 max-w-[250px] mx-auto mb-4"
                />
                <h2 className=" text-xl font-semibold text-center">
                  LoanApp Registration
                </h2>
              </div>
           

              <form
                onSubmit={handleSubmit}
                className="space-y-4 flex flex-col items-center"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-4/5 border-0 border-b border-gray-500 focus:outline-none focus:border-blue-500 bg-transparent py-2"
                />

                <input
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="w-4/5 border-0 border-b border-gray-500 focus:outline-none focus:border-blue-500 bg-transparent py-2"
                  required
                />

                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-4/5 border-0 border-b border-gray-500 focus:outline-none focus:border-blue-500 bg-transparent py-2"
                  // required
                />

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number (e.g. +61412345678)"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-4/5 border-0 border-b border-gray-500 focus:outline-none focus:border-blue-500 bg-transparent py-2"
                  required
                />

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

                <div className="flex items-center justify-center  gap-10 mt-7 space-x-7 w-4/5">
                  <button
                    type="submit"
                    className="flex flex-row items-center justify-center w-full px-4 py-2  text-sm font-bold bg-green-300 leading-6 capitalize duration-100 transform  shadow cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1 rounded-2xl"
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex flex-row items-center justify-center w-full  px-3.5 py-2 text-sm font-bold leading-6 capitalize duration-100 transform border-2 rounded-2xl cursor-pointer border-green-300 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:w-auto sm:px-6 border-text  hover:shadow-lg hover:-translate-y-1"
                  >
                    Cancel
                  </button>
                </div>
                   <div className="h-6 mt-4">
                {successMessage && (
                  <p className="text-green-600  bg-teal-100  h-8 pt-1  px-5 rounded-2xl animate-pulse  text-center text-sm">
                    {successMessage}
                  </p>
                )}
                {errorMessage && (
                  <p className="text-red-600 text-center h-8 pt-1  px-5 rounded-2xl animate-pulse bg-rose-200 text-sm">
                    {errorMessage}
                  </p>
                )}
              </div>
                <div>
                  <p className="text-sm text-gray-500 mt-4">
                    By clicking Register, you agree to our{" "}
                    <a href="#" className="text-blue-500">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-500">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 ">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500">
                      Login here
                    </a>
                    .
                  </p>
                </div>
                <div className="mt-6 ml-6">
                  <a
                    href="/help"
                    className="block text-base text-gray-800 hover:underline"
                  >
                    Online Help
                  </a>
                  <a
                    href="/contact"
                    className="block text-base mx-1 hover:underline"
                  >
                    Contact us
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <footer>
          <div className=" bg-gray-200 text-black text-center py-5 mt-2">
            <p className="text-sm">© 2023 LoanZone. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Register;
