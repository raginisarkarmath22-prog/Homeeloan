import React, { useState } from "react";

const ApplicationFormPopup = ({ project, onClose, onSubmit, defaultCity = "" }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    city: defaultCity,
    budget: "",
    remarks: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Pune",
    "Hyderabad",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // Pass the form data along with project details
    // onSubmit({
    //   ...formData,
    //   projectName: project.name,
    //   projectLoanId: project.loan_id,
    // });
      try {
      const response = await fetch("https://31.97.226.15:8080/api/application/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          budget: Number(formData.budget), // Ensure it's a number
          projectName: project.name,
          projectLoanId: project.loan_id,
        }),
      });
         if (response.ok) {
        setMessage("✅ Application submitted successfully!");
        setFormData({
          fullName: "",
          mobileNumber: "",
          email: "",
          city: defaultCity,
          budget: "",
          remarks: "",
        });
      } else {
        const result = await response.json(); // This was missing 'await'
        setMessage(`❌ Error: ${result.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setMessage("❌ Failed to submit. Please try again later.");
    } finally {
      setLoading(false);
    }

  };
  return (
    <div className="fixed inset-0 flex items-center bg-black/50 backdrop-blur-sm z-50 justify-center p-2">
      {/* popup box */}
      <div className="bg-gray-300 rounded-2xl shadow-2xl p-3 w-full max-w-sm relative">
        <div className="relative mb-2 rounded-lg shadow-sm max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="border-b border-gray-200 pb-1 mb-2 flex items-center justify-between">
            <h1 className="text-center text-xl font-serif font-bold text-gray-800 flex-1">
              Apply Home Loan
            </h1>
            {/* Close Button */}
            <button
              className="text-gray-500 hover:text-gray-800 text-3xl ml-4 focus:outline-none"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {/* Content Card */}
          <div className=" space-y-1 ">
            <p className="text-center font-serif text-lg text-gray-700">
              <span className="font-semibold text-gray-900">Project:</span> {project.name}
            </p>
            <p className="text-center font-serif text-lg text-gray-500">
              {project.loan_id}
            </p>
          </div>

        </div>


        <form onSubmit={handleSubmit} className="space-y-1">
          <div className="space-y-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#1800ad] shadow-sm outline-none" placeholder="Enter your name" required />
          </div>

          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-600 mb-1">Mobile Number</label>
            <input id="mobileNumber" name="mobileNumber" type="tel" value={formData.mobileNumber} onChange={handleChange} className="w-full shadow-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#1800ad] outline-none" placeholder="e.g., 9876543210" required />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full shadow-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#1800ad] outline-none" placeholder="e.g., john@example.com" required />
          </div>

          <div>
            <label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1 block">Select City</label>
            <select id="city" name="city" value={formData.city} onChange={handleChange} className="w-full shadow-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#1800ad] outline-none" required>
              <option value="">-- Choose City --</option>
              {cities.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-600 mb-1">Budget (in Lacs)</label>
            <input id="budget" name="budget" type="number" value={formData.budget} onChange={handleChange} className="w-full shadow-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#1800ad] outline-none" placeholder="e.g., 50" required />
          </div>

          <div>
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-600 ">Remarks</label>
            <textarea id="remarks" name="remarks" rows="3" value={formData.remarks} onChange={handleChange} placeholder="Any specific questions or comments?" className="w-full shadow-sm px-4 py-2 border rounded-md font-medium text-gray-800 focus:ring-2 focus:ring-[#1800ad] outline-none"></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1800ad] text-white font-semibold rounded-full py-2.5 mt-2 hover:bg-[#14008f] transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default ApplicationFormPopup;