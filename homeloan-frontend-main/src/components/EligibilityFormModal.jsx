import React, { useState } from "react";
import axios from "axios";

// Example eligibility check function — Replace with your logic
const checkLoanEligibility = (form) => {
  // Dummy logic example; implement your real eligibility calculation
  const eligible = Number(form.loanAmount) <= 5000000; // e.g. max 5M loan
  const emi = eligible ? (Number(form.loanAmount) / Number(form.loanTenure || 1) / 12) : 0;
  const msg = eligible
    ? `Eligible. Estimated EMI: ₹${Math.round(emi)} per month, Our team will get back to you within 48 hours.`
    : "Your EMI exceeds the recommended limit, Please Contact us on 9830477791.";
  return { eligible, msg, emi };
};

const EligibilityFormModal = ({ showModal, setShowModal }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    permanentAddress: "",
    postalCode: "",
    city: "",
    companyType: "",
    companyName: "",
    occupation: "",
    monthlyIncome: "",
    earnAdditionalIncome: "no",
    additionalIncomeAmount: "",
    receiveRentalIncome: "no",
    rentalIncomeAmount: "",
    receiveNonTaxableIncome: "no",
    nonTaxableIncomeAmount: "",
    inTaxBracket: "no",
    monthlyExpenditure: "",
    hasCarLease: "no",
    carLeaseAmount: "",
    hasBikeLease: "no",
    bikeLeaseAmount: "",
    loanAmount: "",
    loanTenure: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (!showModal) return null;

  const validateForm = () => {
    if (!form.fullName.trim()) return "Full Name is required";
    if (!form.mobile.trim()) return "Mobile Number is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.permanentAddress.trim()) return "Permanent Address is required";
    if (!form.postalCode.trim()) return "Postal Code is required";
    if (!form.city.trim()) return "City is required";
    if (!form.companyType.trim()) return "Company Type is required";
    if (!form.occupation.trim()) return "Occupation is required";
    if (!form.monthlyIncome || Number(form.monthlyIncome) <= 0)
      return "Valid Monthly Income is required";
    if (!form.loanAmount || Number(form.loanAmount) <= 0)
      return "Valid Loan Amount is required";
    if (!form.loanTenure || Number(form.loanTenure) <= 0)
      return "Valid Loan Tenure is required";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Calculate eligibility locally - show result immediately
    const eligibilityResult = checkLoanEligibility(form);
    setResult(eligibilityResult);
    setStep(4);

    // Prepare payload including eligibility results
    const payload = Object.keys(form).reduce((acc, key) => {
      if (key === "fullName") {
        const nameParts = form.fullName.trim().split(" ");
        acc.first_name = nameParts[0] || null;
        acc.last_name = nameParts.slice(1).join(" ") || null;
        return acc;
      }
      if (key === "mobile") {
        acc.phone_number = form.mobile;
        return acc;
      }
      if (key === "monthlyIncome") {
        acc.yearly_income = Number(form.monthlyIncome) * 12;
        return acc;
      }
      if (key === "loanAmount") {
        acc.borrow_amount = form.loanAmount;
        return acc;
      }
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
      acc[snakeKey] = form[key] === "" ? null : form[key];
      return acc;
    }, {});

    // Add calculated eligibility info to payload
    payload.is_eligible = eligibilityResult.eligible ? 1 : 0;  // ✅ fix
    payload.eligibility_message = eligibilityResult.msg;
    payload.calculated_emi = eligibilityResult.emi ? eligibilityResult.emi.toFixed(2) : null;

    // Send data to backend asynchronously
    try {
      await axios.post("http://homeeloan.com/api/eligibility-applications", payload);
      setShowPopup(true);
    } catch (error) {
      console.error("Failed to save eligibility data to DB", error);
      setShowPopup(true);
    }

  };

  const renderYesNoField = (label, field, amountField, placeholder) => (
    <div>
      <p className="font-medium mt-4">{label}</p>
      <div className="flex gap-4 mb-2">
        <button
          type="button"
          onClick={() => setForm({ ...form, [field]: "yes" })}
          className={`px-4 py-1 rounded border ${
            form[field] === "yes" ? "bg-pink-100 border-pink-600" : "border-gray-400"
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setForm({ ...form, [field]: "no", [amountField]: "" })}
          className={`px-4 py-1 rounded border ${
            form[field] === "no" ? "bg-pink-100 border-pink-600" : "border-gray-400"
          }`}
        >
          No
        </button>
      </div>
      {form[field] === "yes" && (
        <input
          type="number"
          name={amountField}
          placeholder={placeholder}
          value={form[amountField]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      )}
    </div>
  );

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border rounded-lg shadow-lg w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-700 text-xl font-bold hover:bg-gray-200 rounded-full p-1"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">Check Your Eligibility</h2>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              {/* Step 1 Fields */}
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="permanentAddress"
                placeholder="Permanent Address"
                value={form.permanentAddress}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={form.postalCode}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={form.companyName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <select
                name="companyType"
                value={form.companyType}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              >
                <option value="">Company Type</option>
                <option value="Private">Private</option>
                <option value="Govt">Government</option>
                <option value="MNC">MNC</option>
                <option value="PSU">PSU</option>
                <option value="Others">Others</option>
              </select>
              <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                value={form.occupation}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-green-600 text-white px-4 py-2 rounded w-full"
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {/* Step 2 Fields */}
              <input
                type="number"
                name="monthlyIncome"
                placeholder="Monthly Income"
                value={form.monthlyIncome}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              {renderYesNoField(
                "Do you earn any additional income?",
                "earnAdditionalIncome",
                "additionalIncomeAmount",
                "Enter yearly amount"
              )}
              {renderYesNoField(
                "Do you receive any rental income?",
                "receiveRentalIncome",
                "rentalIncomeAmount",
                "Enter yearly amount"
              )}
              {renderYesNoField(
                "Do you receive any non-taxable income?",
                "receiveNonTaxableIncome",
                "nonTaxableIncomeAmount",
                "Enter yearly amount"
              )}
              <div>
                <p className="font-medium mt-4">Are you in income tax bracket?</p>
                <div className="flex gap-4 mb-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, inTaxBracket: "yes" })}
                    className={`px-4 py-1 rounded border ${
                      form.inTaxBracket === "yes"
                        ? "bg-pink-100 border-pink-600"
                        : "border-gray-400"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, inTaxBracket: "no" })}
                    className={`px-4 py-1 rounded border ${
                      form.inTaxBracket === "no"
                        ? "bg-pink-100 border-pink-600"
                        : "border-gray-400"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
              <input
                type="number"
                name="monthlyExpenditure"
                placeholder="Monthly Expenditure"
                value={form.monthlyExpenditure}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {renderYesNoField(
                "Do you have a novated car lease?",
                "hasCarLease",
                "carLeaseAmount",
                "Enter yearly amount"
              )}
              {renderYesNoField(
                "Do you have a novated bike lease?",
                "hasBikeLease",
                "bikeLeaseAmount",
                "Enter yearly amount"
              )}

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <input
                type="number"
                name="loanAmount"
                placeholder="Loan Amount"
                value={form.loanAmount}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="loanTenure"
                placeholder="Loan Tenure (years)"
                value={form.loanTenure}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </>
          )}

          {step === 4 && result && (
            <div className="text-center">
              <h3
                className={`text-xl font-semibold mb-2 ${
                  result.eligible ? "text-green-700" : "text-red-600"
                }`}
              >
                {result.eligible ? "Congratulations!" : "Eligibility Status"}
              </h3>
              <p className={`text-base ${result.eligible ? "text-gray-700" : "text-red-600"}`}>{result.msg}</p>
              <button
                onClick={() => {
                  setShowModal(false);
                  setStep(1);
                  setForm({
                    fullName: "",
                    mobile: "",
                    email: "",
                    permanentAddress: "",
                    postalCode: "",
                    city: "",
                    companyType: "",
                    companyName: "",
                    occupation: "",
                    monthlyIncome: "",
                    earnAdditionalIncome: "no",
                    additionalIncomeAmount: "",
                    receiveRentalIncome: "no",
                    rentalIncomeAmount: "",
                    receiveNonTaxableIncome: "no",
                    nonTaxableIncomeAmount: "",
                    inTaxBracket: "no",
                    monthlyExpenditure: "",
                    hasCarLease: "no",
                    carLeaseAmount: "",
                    hasBikeLease: "no",
                    bikeLeaseAmount: "",
                    loanAmount: "",
                    loanTenure: "",
                  });
                }}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Check Another Loan
              </button>
            </div>
          )}
        </form>
        {showPopup && (
          <div className="fixed inset-0   flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl text-center">
              <h3 className="text-xl font-semibold mb-3">
                {result?.eligible ? "Success ✅" : "Not Eligible ❌"}
              </h3>
              <p className="mb-4">
                {result?.eligible
                  ? "Your application has been recorded successfully."
                  : "We saved your application. Our team will contact you soon."}
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EligibilityFormModal;
