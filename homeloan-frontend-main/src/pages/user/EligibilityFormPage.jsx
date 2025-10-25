import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
// Removed duplicate imports
// import { motion } from "framer-motion";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";

const loanSteps = [
  "Loan details",
  "Your details",
  "Income & Employment",
  "Monthly Expenses",
  "Do I qualify?",
];

function checkLoanEligibility(user) {
  // Step 1: Basic validations
  if (user.borrowAmount > user.propertyWorth) {
    return {
      eligible: false,
      msg: "Borrow amount cannot exceed property worth.",
    };
  }

  // Step 2: Income
  let totalIncome =
    Number(user.yearlyIncome || 0) +
    Number(user.additionalIncomeAmount || 0) +
    Number(user.rentalIncomeAmount || 0) +
    Number(user.nonTaxableIncomeAmount || 0);
  let netIncome = user.inTaxBracket === "yes" ? totalIncome * 0.8 : totalIncome; // 20% tax deduction

  // Step 3: Expenses
  let totalExpenses =
    Number(user.monthlyLivingExpenditure || 0) * 12 +
    Number(user.anotherHomeLoanAmount || 0) +
    Number(user.personalLoanAmount || 0) +
    Number(user.creditCardDebtAmount || 0) +
    Number(user.investmentLoanAmount || 0);
  let disposableIncome = netIncome - totalExpenses;

  if (disposableIncome <= 0) {
    return { eligible: false, msg: "Expenses exceed income. Not eligible.", emi: null };
  }

  // Step 4: EMI
  let tenureMonths = Number(user.loanTenure || 0) * 12;
  let r = (Number(user.interestRate || 9) / 100) / 12; // Default interest rate 9% if not provided
  let EMI =
    (Number(user.borrowAmount || 0) * r * Math.pow(1 + r, tenureMonths)) /
    (Math.pow(1 + r, tenureMonths) - 1);

  // Step 5: Affordability check
  let maxAllowedEMI = (disposableIncome / 12) * 0.5;

  if (
    EMI <= maxAllowedEMI &&
    Number(user.borrowAmount || 0) / Number(user.propertyWorth || 1) <= 0.9
  ) {
    return {
      eligible: true,
      msg: `Eligible. Estimated EMI: ₹${Math.round(
        EMI
      )} per month, Our team will get back to you within 48 hours.`,
      emi: EMI,
    };
  } else {
    return {
      eligible: false,
      msg: "Your EMI exceeds the recommended limit, but our team will review and get back to you.",
      emi: EMI,
    };
  }
}

const initialFormState = {
  loanPurpose: "",
  propertyUse: "",
  foundProperty: "",
  whenToBuy: "",
  propertyWorth: "",
  borrowAmount: "",
  loanTenure: "",
  applicantType: "",
  relationshipStatus: "",
  secondBorrowerRelationStatus: "",
  companyType: "",
  companyName: "",
  occupation: "",
  dependents: "",
  postalCode: "",
  yearlyIncome: "",
  earnAdditionalIncome: "no",
  additionalIncomeAmount: "",
  receiveRentalIncome: "no",
  rentalIncomeAmount: "",
  receiveNonTaxableIncome: "no",
  nonTaxableIncomeAmount: "",
  inTaxBracket: "no",
  monthlyLivingExpenditure: "",
  hasOtherExpenses: "no",
  otherExpensesAmount: "",
  hasAnotherHomeLoan: "no",
  anotherHomeLoanAmount: "",
  hasPersonalLoan: "no",
  personalLoanAmount: "",
  hasCreditCardDebt: "no",
  creditCardDebtAmount: "",
  hasInvestmentLoan: "no",
  investmentLoanAmount: "",
  hasCarLease: "no",
  carLeaseAmount: "",
  hasBikeLease: "no",
  bikeLeaseAmount: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const EligibilityFormPage = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialFormState);
  const [eligibilityResult, setEligibilityResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (field, value) => {
    let updated = { ...form, [field]: value };

    if (value !== "" && errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }

    if (field === "loanPurpose") {
      updated = {
        loanPurpose: value,
        propertyUse: "",
        foundProperty: "",
        whenToBuy: "",
        propertyWorth: "",
        borrowAmount: "",
        loanTenure: "", // Corrected from loantenure
      };
    }
    if (field === "propertyUse") {
      updated.foundProperty = "";
      updated.whenToBuy = "";
      updated.propertyWorth = "";
      updated.borrowAmount = "";
      updated.loanTenure = ""; // Corrected from loantenure
    }
    if (field === "foundProperty" || field === "whenToBuy") {
      updated.propertyWorth = "";
      updated.borrowAmount = "";
      updated.loanTenure = ""; // Corrected from loantenure
    }

    if (field === "applicantType") {
      updated.relationshipStatus = "";
      updated.secondBorrowerRelationStatus = "";
    }

    if (field === "relationshipStatus") {
      updated.secondBorrowerRelationStatus = "";
    }

    // Restrict postal code input to max 6 digits
    if (field === "postalCode") {
      value = value.replace(/\D/g, "").slice(0, 6);
      updated.postalCode = value;
    }

    setForm(updated);
  };

  const handleNext = () => {
    let newErrors = {};

    if (step === 0) {
      // Step 0 validation
      const {
        loanPurpose,
        propertyUse,
        foundProperty,
        whenToBuy,
        propertyWorth,
        borrowAmount,
        loanTenure, // added loan tenure
      } = form;

      if (!loanPurpose) {
        newErrors.loanPurpose = "Please select what the loan is for.";
      }
      if (!propertyUse) {
        newErrors.propertyUse = "Please select how you will use the property.";
      }

      const isRefinancing = loanPurpose === "i'm refinancing";
      const isBuying = loanPurpose === "i'm buying";
      const isBuilding = loanPurpose === "i'm building";

      if (
        (isRefinancing && propertyUse) ||
        ((isBuying || isBuilding) &&
          propertyUse &&
          (foundProperty || whenToBuy))
      ) {
        if (!propertyWorth) {
          newErrors.propertyWorth = "Please enter property worth.";
        }
        if (!borrowAmount) {
          newErrors.borrowAmount = "Please enter borrow amount.";
        }
        if (!loanTenure) {
          newErrors.loanTenure = "Please enter loan tenure.";
        } else if (parseInt(loanTenure, 10) < 1) {
          newErrors.loanTenure = "Loan tenure must be at least 1 year.";
        } else if (parseInt(loanTenure, 10) > 50) {
          newErrors.loanTenure = "Loan tenure cannot exceed 50 years.";
        }

        const worth = parseFloat(propertyWorth);
        const borrow = parseFloat(borrowAmount);

        if (borrowAmount && borrow < 1000000) {
          newErrors.borrowAmount = "Minimum borrow amount is ₹10,00,000.";
        } else if (propertyWorth && borrowAmount) {
          if ((isRefinancing || isBuying || isBuilding) && borrow > worth) {
            newErrors.borrowAmount =
              "Borrow amount cannot exceed property worth.";
          }
        }
      }

      // Proceed only if no errors
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;
      setStep((prev) => prev + 1);
      return; // Exit after handling step 0
    }

    if (step === 1) {
      // Step 1 validation
      const { postalCode, applicantType, dependents, relationshipStatus } =
        form;

      // Postal code validation
      const trimmedCode = postalCode.trim();
      if (trimmedCode === "") {
        newErrors.postalCode = "Postal code is required.";
      } else if (!/^[1-9][0-9]{5}$/.test(trimmedCode)) {
        newErrors.postalCode =
          "Enter a valid 6-digit Indian PIN code (should not start with 0).";
      }

      // Applicant type validation
      if (!applicantType) {
        newErrors.applicantType =
          "Please select who is applying for this loan.";
      }

      // Relationship status validation for 'justMe'
      if (applicantType === "justMe") {
        if (!relationshipStatus) {
          newErrors.relationshipStatus =
            "Please select your relationship status.";
        }
      }

      // Dependents validation
      if (!dependents || dependents === "") {
        newErrors.dependents = "Please select number of dependents.";
      }

      // Set errors & check
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;
      setStep((prev) => prev + 1);
      return;
    }

    if (step === 2) {
      // Step 2 validation
      const {
        yearlyIncome,
        earnAdditionalIncome,
        additionalIncomeAmount,
        receiveRentalIncome,
        rentalIncomeAmount,
        receiveNonTaxableIncome,
        nonTaxableIncomeAmount,
        inTaxBracket,
      } = form;

      // List of required fields
      const requiredFields = [
        "yearlyIncome",
        "earnAdditionalIncome",
        "receiveRentalIncome",
        "receiveNonTaxableIncome",
        "inTaxBracket",
      ];

      requiredFields.forEach((field) => {
        if (!form[field] && form[field] !== "no") {
          newErrors[field] = "This field is required.";
        }
      });

      // Additional income validation
      if (
        form.earnAdditionalIncome === "yes" &&
        (!form.additionalIncomeAmount ||
          Number(form.additionalIncomeAmount) <= 0)
      ) {
        newErrors.additionalIncomeAmount = "Enter yearly amount.";
      }

      // Rental income validation
      if (
        form.receiveRentalIncome === "yes" &&
        (!form.rentalIncomeAmount || Number(form.rentalIncomeAmount) <= 0)
      ) {
        newErrors.rentalIncomeAmount = "Enter yearly amount.";
      }

      // Non-taxable income validation
      if (
        form.receiveNonTaxableIncome === "yes" &&
        (!form.nonTaxableIncomeAmount ||
          Number(form.nonTaxableIncomeAmount) <= 0)
      ) {
        newErrors.nonTaxableIncomeAmount = "Enter yearly amount.";
      }

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;
      setStep((prev) => prev + 1);
      return;
    }

    if (step === 3) {
      // Step 3 validation
      const {
        monthlyLivingExpenditure,
        hasOtherExpenses,
        otherExpensesAmount,
        hasAnotherHomeLoan,
        anotherHomeLoanAmount,
        hasPersonalLoan,
        personalLoanAmount,
        hasCreditCardDebt,
        creditCardDebtAmount,
        hasInvestmentLoan,
        investmentLoanAmount,
      } = form;

      // Validate monthly expenditure
      if (!monthlyLivingExpenditure || Number(monthlyLivingExpenditure) <= 0) {
        newErrors.monthlyLivingExpenditure =
          "Please enter your monthly living expenditure.";
      }

      // Yes/No questions validation
      const yesNoQuestions = [
        { key: "hasOtherExpenses", amountKey: "otherExpensesAmount" },
        { key: "hasAnotherHomeLoan", amountKey: "anotherHomeLoanAmount" },
        { key: "hasPersonalLoan", amountKey: "personalLoanAmount" },
        { key: "hasCreditCardDebt", amountKey: "creditCardDebtAmount" },
        { key: "hasInvestmentLoan", amountKey: "investmentLoanAmount" },
      ];

      yesNoQuestions.forEach(({ key, amountKey }) => {
        const answer = form[key];
        const amount = form[amountKey];

        if (answer !== "yes" && answer !== "no") {
          newErrors[key] = "Please select Yes or No.";
        }

        if (answer === "yes") {
          if (!amount || Number(amount) <= 0) {
            newErrors[amountKey] = "Please enter a valid amount.";
          }
        }
      });

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;
      setStep((prev) => prev + 1);
      return;
    }
  };
  const handleBack = () => setStep((prev) => prev - 1);

  const isStep0Complete = () => {
    const {
      loanPurpose,
      propertyUse,
      foundProperty,
      propertyWorth,
      borrowAmount,
      loanTenure,
    } = form;

    if (!loanPurpose || !propertyUse) return false;

    const isRefinancing = loanPurpose === "i'm refinancing";
    const isBuying = loanPurpose === "i'm buying";
    const isBuilding = loanPurpose === "i'm building";

    if (
      (isRefinancing && propertyUse) ||
      ((isBuying || isBuilding) && propertyUse && foundProperty === "yes")
    ) {
      if (!propertyWorth || !borrowAmount || !loanTenure) return false;
      const worth = parseFloat(propertyWorth);
      const borrow = parseFloat(borrowAmount);
      const tenure = parseInt(loanTenure, 10);
      if (borrow < 1000000 || tenure < 1 || tenure > 50) return false;
      if ((isRefinancing || isBuying || isBuilding) && borrow > worth) return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const { firstName, lastName, email, phoneNumber } = form;
    const newErrors = {};

    if (!firstName || firstName.trim() === "") {
      newErrors.firstName = "First name is required.";
    }
    if (!lastName || lastName.trim() === "") {
      newErrors.lastName = "Last name is required.";
    }
    if (!email || email.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!phoneNumber || phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10,15}$/.test(phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Enter a valid phone number.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // You can allow user to input interestRate or set a default (e.g. 9%)
    const userData = {
      ...form,
      interestRate: form.interestRate || 9, // Default 9% if not provided
    };
    const result = checkLoanEligibility(userData);
    setEligibilityResult(result);

    // Convert camelCase form keys to snake_case for the backend DB
    const snakeCasePayload = Object.keys(form).reduce((acc, key) => {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
      );
      // Ensure empty strings are sent as null for better DB handling
      acc[snakeKey] = form[key] === "" ? null : form[key];
      return acc;
    }, {});

    const payload = {
      ...snakeCasePayload,
      interest_rate: userData.interestRate,
      is_eligible: result.eligible ? 1 : 0,   // ✅ fix: store 1 or 0
      eligibility_message: result.msg,
      calculated_emi: result.emi ? result.emi.toFixed(2) : null,
    };


    try {
      const response = await fetch("/api/eligibility-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Show popup regardless of response
      setShowPopup(true);

      if (!response.ok) {
        console.error("Failed to submit eligibility data");
      }
    } catch (error) {
      console.error("Error submitting eligibility data:", error);
      setShowPopup(true);
    }
  };

  const handleStartOver = () => {
    setStep(0);
    setForm(initialFormState);
    setErrors({});
    setEligibilityResult(null);
  };

  const renderYesNoField = (
    label,
    yesNoField,
    amountField,
    amountPlaceholder
  ) => (
    <div className="mb-4">
      <p className="font-medium">
        {label} <span className="text-red-600">*</span>
      </p>
      <div className="flex gap-4 mb-2">
        <button
          type="button"
          onClick={() => setForm({ ...form, [yesNoField]: "yes" })}
          className={`px-4 py-1 m-2 rounded-4xl border ${form[yesNoField] === "yes"
            ? "bg-blue-400 border-blue-500 text-white"
            : "border-gray-400"
            }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() =>
            setForm({ ...form, [yesNoField]: "no", [amountField]: "" })
          }
          className={`px-4 py-1 m-2 rounded-4xl border ${form[yesNoField] === "no"
            ? "bg-blue-400 border-blue-500"
            : "border-gray-400"
            }`}
        >
          No
        </button>
      </div>
      {errors[yesNoField] && (
        <div className="text-red-600 text-sm">{errors[yesNoField]}</div>
      )}
      {form[yesNoField] === "yes" && (
        <>
          <input
            type="number"
            name={amountField}
            placeholder={amountPlaceholder}
            value={form[amountField]}
            onChange={(e) =>
              setForm({ ...form, [amountField]: e.target.value })
            }
            className="w-[70%] sm:w-[30%] px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition font-serif"
          />
          {errors[amountField] && (
            <div className="text-red-600 text-sm">{errors[amountField]}</div>
          )}
        </>
      )}
    </div>
  );
  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-r from-blue-100 to-green-100 pt-24 pb-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
              Pre-qualify for a <span className="bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">Home Loan</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Find out if you pre-qualify for a home loan in just 2 minutes with no credit check.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Stepper */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:w-1/4"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-green-800 mb-6 text-center">Progress</h3>
                <div className="relative">

                  {/* Horizontal line for mobile */}
                  <div className="absolute left-4 right-5 top-2 transform -translate-y-1/2 h-[2px] bg-[#14d159b5] border-t-2 border-dotted md:hidden"></div>

                  {/* Vertical line for md+ */}
                  <div className="absolute left-3 top-4 bottom-4 w-[2.5px] bg-[#14d159b5] border-l-2 border-dotted hidden md:block"></div>

                  {/* Steps - horizontal on mobile, vertical on desktop */}
                  <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start md:pr-2 gap-4 relative z-10">
                    {loanSteps.map((label, idx) => (
                      <motion.div
                        key={`step-${idx}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * idx }}
                        onClick={() => setStep(idx)}
                        className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-4 cursor-pointer text-center md:text-left"
                      >
                        {/* Spinner circle — responsive sizing */}
                        <div
                          className={`w-3 md:w-5 h-3 md:h-5 rounded-full border-2 border-dotted flex items-center justify-center transition-all duration-300 ${step === idx
                              ? "border-green-400 bg-[#202f57] animate-pulse spin-slow"
                              : "border-[#3b7561] bg-[#202f57]"
                            }`}
                        >
                          {step === idx && <div className="w-1 h-1 rounded-full bg-green-500"></div>}
                        </div>

                        {/* Label text */}
                        <span
                          className={`text-xs md:text-sm font-medium transition-colors duration-300 ${step === idx
                              ? "text-green-800"
                              : step > idx
                                ? "text-green-500"
                                : "text-blue-300 text-opacity-70"
                            }`}
                        >
                          {label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inline animation keyframes (copied from LoanStepsTimeline) */}
              <style>
                {`
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .spin-slow {
        animation: spin-slow 6s linear infinite;
      }
    `}
              </style>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:w-3/4"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-2 mb-8"
                >
                  <div className="text-sm uppercase text-white font-bold border-green-700 border-b-4 py-2 px-4 rounded-lg bg-gradient-to-r from-green-700 to-green-800 shadow-lg backdrop-blur-sm bg-green-200/20">
                    {`${step + 1}/${loanSteps.length} • ${loanSteps[step]}`}
                  </div>
                </motion.div>

                {step === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h2 className="text-3xl font-bold mb-4">
                      Pre-qualify for a{" "}
                      <span className="bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
                        Home Loan
                      </span>
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                      Find out if you pre-qualify for a home loan in just 2 minutes with no credit check.
                    </p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <p className="font-semibold mb-4 text-lg">
                        What is the loan for? <span className="text-red-600">*</span>
                      </p>
                      <div className="flex gap-4 mb-8 flex-wrap">
                        {["i'm refinancing", "i'm buying", "i'm building"].map((type) => (
                          <motion.button
                            key={`loan-purpose-${type}`}
                            onClick={() => handleChange("loanPurpose", type)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-1 border-b-2 rounded-lg border text-sm capitalize font-medium transition-all duration-300 shadow-md ${form.loanPurpose === type
                              ? "bg-gradient-to-r from-green-700 to-green-800 text-white border-transparent shadow-lg"
                              : "bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 border-gray-300 text-gray-700 hover:shadow-lg"
                              }`}
                          >
                            {type}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {form.loanPurpose && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <p className="font-semibold mb-4 text-lg">
                          How will you use the property?{" "}
                          <span className="text-red-600">*</span>
                        </p>
                        <div className="flex gap-4 mb-8">
                          {["to live in", "an investment"].map((use) => (
                            <motion.button
                              key={`property-use-${use}`}
                              onClick={() => handleChange("propertyUse", use)}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-6 py-1 rounded-lg border font-medium transition-all duration-300 shadow-md ${form.propertyUse === use
                                ? "bg-gradient-to-r from-green-700 to-green-800 text-white border-transparent shadow-lg"
                                : "bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 border-gray-300 text-gray-700 hover:shadow-lg"
                                }`}
                            >
                              {use}
                            </motion.button>
                          ))}
                        </div>
                        {errors.propertyUse && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-red-600 text-sm mb-4 p-2 bg-red-50 rounded-lg border border-red-200"
                          >
                            {errors.propertyUse}
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {/* After loan purpose buttons */}
                    {errors.loanPurpose && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-red-600 text-sm mb-4 p-2 bg-red-50 rounded-lg border border-red-200"
                      >
                        {errors.loanPurpose}
                      </motion.div>
                    )}

                    {/* After property worth input */}
                    {form.loanPurpose === "i'm refinancing" && form.propertyUse && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="grid grid-cols-1 gap-6"
                      >
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">
                            What is the property worth?{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="number"
                            placeholder="e.g. 5000000"
                            value={form.propertyWorth}
                            onChange={(e) =>
                              handleChange("propertyWorth", e.target.value)
                            }
                            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:shadow-md"
                          />
                          {errors.propertyWorth && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded-lg border border-red-200"
                            >
                              {errors.propertyWorth}
                            </motion.div>
                          )}
                          <p className="text-sm mt-2 text-green-600 font-medium">
                            An estimate is fine, we can change this later
                          </p>
                        </div>
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">
                            How much are you looking to borrow?{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="number"
                            placeholder="e.g. 4000000"
                            value={form.borrowAmount}
                            onChange={(e) =>
                              handleChange("borrowAmount", e.target.value)
                            }
                            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:shadow-md"
                          />
                          {errors.borrowAmount && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded-lg border border-red-200"
                            >
                              {errors.borrowAmount}
                            </motion.div>
                          )}
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">
                            Length of your loan plan{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="number"
                            placeholder="e.g. 20 (in years)"
                            value={form.loanTenure}
                            onChange={(e) => handleChange("loanTenure", e.target.value)}
                            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:shadow-md"
                          />
                          {errors.loanTenure && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded-lg border border-red-200"
                            >
                              {errors.loanTenure}
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                    {form.loanPurpose === "i'm buying" && form.propertyUse && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                      >
                        <p className="font-semibold mb-4 text-lg">
                          Have you found a property yet?
                        </p>
                        <div className="flex gap-4 mb-8">
                          {["yes", "no"].map((ans) => (
                            <motion.button
                              key={`found-property-${ans}`}
                              onClick={() => handleChange("foundProperty", ans)}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-6 py-1 rounded-lg border font-medium transition-all duration-300 shadow-md ${form.foundProperty === ans
                                ? "bg-gradient-to-r from-green-700 to-green-800 text-white border-transparent shadow-lg"
                                : "bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 border-gray-300 text-gray-700 hover:shadow-lg"
                                }`}
                            >
                              {ans.toUpperCase()}
                            </motion.button>
                          ))}
                        </div>

                        {form.foundProperty === "yes" && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                            className="grid gap-6"
                          >
                            <div>
                              <label className="block text-lg font-medium text-gray-700 mb-2">
                                What are you looking to pay for the property?
                              </label>
                              <input
                                type="number"
                                placeholder="e.g. 5000000"
                                value={form.propertyWorth}
                                onChange={(e) =>
                                  handleChange("propertyWorth", e.target.value)
                                }
                                className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:shadow-md"
                              />
                              {errors.propertyWorth && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded-lg border border-red-200"
                                >
                                  {errors.propertyWorth}
                                </motion.div>
                              )}
                            </div>
                            <div>
                              <label className="block text-lg font-medium text-gray-700 mb-2">
                                How much are you looking to borrow?
                              </label>
                              <input
                                type="number"
                                placeholder="e.g. 4000000"
                                value={form.borrowAmount}
                                onChange={(e) =>
                                  handleChange("borrowAmount", e.target.value)
                                }
                                className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:shadow-md"
                              />
                              {errors.borrowAmount && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded-lg border border-red-200"
                                >
                                  {errors.borrowAmount}
                                </motion.div>
                              )}
                            </div>
                            <div>
                              <label className="block text-lg font-medium text-gray-700 mb-2">
                                Length of your loan plan{" "}
                                <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="number"
                                placeholder="e.g. 20 (in years)"
                                value={form.loanTenure}
                                onChange={(e) =>
                                  handleChange("loanTenure", e.target.value)
                                }
                                className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:shadow-md"
                              />
                              {errors.loanTenure && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded-lg border border-red-200"
                                >
                                  {errors.loanTenure}
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                        {form.propertyUse === "an investment" &&
                          form.foundProperty === "no" && (
                            <>
                              {/* <p className="font-semibold mt-6 mb-2">
                        How soon are you looking to buy?
                      </p> */}
                              <div className="flex gap-4 mb-6">
                                {/* {["now", "within 3 months", "3months+"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleChange("whenToBuy", opt)}
                            className={` px-6 py-2 rounded-lg border ${
                              form.whenToBuy === opt
                                ? "border-green-600 text-green-600 font-semibold"
                                : "border-gray-300"
                            }`}
                          >
                            {opt}
                          </button>
                        ))} */}
                              </div>
                            </>
                          )}
                      </motion.div>
                    )}

                    {form.loanPurpose === "i'm building" && form.propertyUse && (
                      <>
                        <p className="font-semibold mt-6 mb-2">
                          Have you found a site/package yet?
                        </p>
                        <div className="flex gap-4 mb-6">
                          {["yes", "no"].map((ans) => (
                            <button
                              key={ans}
                              onClick={() => handleChange("foundProperty", ans)}
                              className={`px-6 py-1 hover:bg-sky-400 bg-blue-300 rounded-lg border ${form.foundProperty === ans
                                ? "border-green-600 text-white font-semibold"
                                : "border-gray-300"
                                }`}
                            >
                              {ans.toUpperCase()}
                            </button>
                          ))}
                        </div>

                        {form.foundProperty === "yes" && (
                          <div className="grid  gap-6">
                            <div>
                              <p className="mb-1">
                                What are you looking to pay for the land and build?
                              </p>
                              <input
                                type="number"
                                placeholder="eg..Property Worth"
                                value={form.propertyWorth}
                                onChange={(e) =>
                                  handleChange("propertyWorth", e.target.value)
                                }
                                className="w-[70%] sm:w-[30%]   drop-shadow-lg bg-gray-100 p-2 border-blue-200  border-2 ml-1 rounded-lg"
                              />
                              {errors.propertyWorth && (
                                <div className="text-red-600 text-sm">
                                  {errors.propertyWorth}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="mb-1">
                                How much are you looking to borrow?
                              </p>
                              <input
                                type="number"
                                placeholder="eg..Borrow Amount"
                                value={form.borrowAmount}
                                onChange={(e) =>
                                  handleChange("borrowAmount", e.target.value)
                                }
                                className="w-[70%] sm:w-[30%]   drop-shadow-lg bg-gray-100 p-2 border-blue-200  border-2 ml-1 rounded-lg"
                              />
                              {errors.borrowAmount && (
                                <div className="text-red-600 text-sm">
                                  {errors.borrowAmount}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="mb-1">
                                {" "}
                                Length of your loan plan{" "}
                                <span className="text-red-600">*</span>
                              </p>
                              <input
                                type="number"
                                placeholder="eg..20 (in years)"
                                value={form.loanTenure}
                                onChange={(e) =>
                                  handleChange("loanTenure", e.target.value)
                                }
                                className="w-[70%] sm:w-[30%]   drop-shadow-lg bg-gray-100 p-2 border-blue-200  border-2 ml-1 rounded-lg"
                              />
                              {errors.loanTenure && (
                                <div className="text-red-600 text-sm">
                                  {errors.loanTenure}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Expecting price and loan for future purchases */}
                    {form.foundProperty === "no" && form.whenToBuy && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                          <p className="mb-1">
                            What are you expecting to pay for the property?
                          </p>
                          <input
                            type="number"
                            placeholder="eg..12356"
                            value={form.propertyWorth}
                            onChange={(e) =>
                              handleChange("propertyWorth", e.target.value)
                            }
                            className="w-[70%] sm:w-[30%]   drop-shadow-lg bg-gray-100 p-2 border-blue-200  border-2 ml-1 rounded-lg"
                          />
                        </div>
                        <div>
                          <p className="mb-1">How much are you looking to borrow?</p>
                          <input
                            type="number"
                            placeholder="eg..12356"
                            value={form.borrowAmount}
                            onChange={(e) =>
                              handleChange("borrowAmount", e.target.value)
                            }
                            className="w-[70%] sm:w-[30%]   drop-shadow-lg bg-gray-100 p-2 border-blue-200  border-2 ml-1 rounded-lg"
                          />
                        </div>
                      </div>
                    )}

                    {/* Next Button for Step 0 */}
                    {isStep0Complete() && (
                      <div className="flex justify-end mt-6">
                        <button
                          type="button"
                          onClick={handleNext}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-900 to-emerald-700 text-gray-700 font-semibold px-5 py-2 rounded-full shadow-lg hover:from-green-700 hover:to-emerald-800 transform hover:-translate-y-0.5 transition"
                        >
                          Next →
                        </button>
                      </div>
                    )}

                  </motion.div>
                )}
                {step === 1 && (
                  <div className="sm:ml-10 space-y-10 border-gray-100 border-2 p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-2">
                      Let us know about
                      <span className="text-green-600 font-serif text-3xl">
                        yourself
                      </span>
                    </h1>
                    <p className="text-gray-600 mb-6 font-serif">
                      We prioritize your data security and privacy.
                    </p>

                    <p className="font-semibold mb-2">
                      Who's applying for this loan ?{" "}
                      <span className="text-red-600">*</span>
                    </p>
                    <div className="flex gap-4 mb-6">
                      {["justMe", "mePlusOne"].map((type) => (
                        <button
                          key={`applicant-type-${type}`}
                          onClick={() => handleChange("applicantType", type)}
                          className={`px-6 py-1 rounded-lg border  text-sm ${form.applicantType === type
                            ? "bg-blue-400 text-white border-blue-500"
                            : "bg-blue-100 text-gray-700 border-gray-300 hover:bg-blue-200"
                            }`}
                        >
                          {type === "justMe" ? "Just Me" : "Me, plus one"}
                        </button>
                      ))}
                    </div>
                    {errors.applicantType && (
                      <div className="text-red-600 text-sm">{errors.applicantType}</div>
                    )}
                    {form.applicantType === "justMe" && (
                      <>
                        <p className="mb-2 font-semibold text-blue-900">
                          Your Relationship Status
                        </p>
                        <div className="flex gap-4 mb-6">
                          {["single", "in a relationship"].map((status) => (
                            <button
                              key={`relationship-status-${status}`}
                              type="button"
                              onClick={() =>
                                setForm({ ...form, relationshipStatus: status })
                              }
                              className={`px-6 py-1 rounded-lg border transition-all duration-200 ${form.relationshipStatus === status
                                ? "bg-blue-400 text-white border-blue-500"
                                : "bg-blue-100 text-gray-700 border-gray-300 hover:bg-blue-200"
                                }`}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                    {form.applicantType === "mePlusOne" && (
                      <>
                        <p className="font-semibold mb-2">Your relationship status</p>
                        <div className="flex gap-4 mb-6 flex-wrap">
                          {[
                            "single",
                            "in a relationship with second borrower",
                            "in a relationship but not with second borrower",
                          ].map((status) => (
                            <button
                              key={status}
                              onClick={() =>
                                setForm({
                                  ...form,
                                  relationshipStatus: status,
                                  secondBorrowerRelationStatus: "",
                                })
                              }
                              className={`px-6 py-1 rounded-lg border text-sm ${form.relationshipStatus === status
                                ? "bg-blue-400 text-white border-blue-500"
                                : "bg-blue-100 text-gray-700 border-gray-300 hover:bg-blue-200"
                                }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>

                        {(form.relationshipStatus === "single" ||
                          form.relationshipStatus ===
                          "in a relationship but not with second borrower") && (
                            <>
                              <p className="font-semibold mb-2">
                                Second borrower's relationship status
                              </p>
                              <div className="flex gap-4 mb-6">
                                {["single", "in a relationship"].map((status) => (
                                  <button
                                    key={status}
                                    onClick={() =>
                                      setForm({
                                        ...form,
                                        secondBorrowerRelationStatus: status,
                                      })
                                    }
                                    className={`px-6 py-1 rounded-lg bg-blue-400 border ${form.secondBorrowerRelationStatus === status
                                      ? " hover:bg-sky-500 bg-blue-500 text-white border-green-700"
                                      : "bg-blue-300 text-gray-700 border-gray-300"
                                      }`}
                                  >
                                    {status}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                      </>
                    )}
                    {/* dependent  */}

                    <h1 className="text-xl font-semibold mb-2">
                      {" "}
                      Dependents <span className="text-red-600">*</span>{" "}
                    </h1>
                    <p className="text-gray-700 mb-2">
                      {" "}
                      A dependent is a child under the age of 18 and living in your
                      care.
                    </p>
                    <div className="relative sm:w-[30%] w-[70%]">
                      <select
                        value={form.dependents}
                        onChange={(e) =>
                          setForm({ ...form, dependents: e.target.value })
                        }
                        className="w-full px-4 py-2  rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 cursor-pointer transition duration-200"
                      >
                        <option value="">Select dependents</option>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid gap-4 ">
                      <select
                        name="companyType"
                        value={form.companyType}
                        onChange={(e) => handleChange("companyType", e.target.value)}
                        placeholder="company Type"
                        className={`w-[70%] md:w-[30%] px-4 py-3 rounded-lg border text-sm shadow-sm transition duration-200
                    ${errors.companyType
                            ? "border-pink-500 bg-pink-50 focus:outline-pink-600"
                            : "border-gray-300 focus:outline-blue-500 hover:border-blue-400"
                          }`}
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
                        name="companyName"
                        value={form.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        placeholder="company Name"
                        className={`w-[70%] md:w-[30%] px-4 py-3 rounded-lg border text-sm shadow-sm transition duration-200
                    ${errors.companyName
                            ? "border-pink-500 bg-pink-50 focus:outline-pink-600"
                            : "border-gray-300 focus:outline-blue-500 hover:border-blue-400"
                          }`}
                      />
                      <input
                        type="text"
                        name="occupation"
                        value={form.occupation}
                        onChange={(e) => handleChange("occupation", e.target.value)}
                        placeholder="occupation"
                        className={`w-[70%] md:w-[30%] px-4 py-3 rounded-lg border text-sm shadow-sm transition duration-200
                    ${errors.occupation
                            ? "border-pink-500 bg-pink-50 focus:outline-pink-600"
                            : "border-gray-300 focus:outline-blue-500 hover:border-blue-400"
                          }`}
                      />
                    </div>
                    <div>
                      <p className="mb-1 ml-3">
                        Postal Code (PIN) <span className="text-red-600">*</span>
                      </p>
                      <input
                        type="text"
                        value={form.postalCode}
                        onChange={(e) =>
                          handleChange("postalCode", e.target.value.replace(/\D/g, ""))
                        }
                        className="w-[70%] sm:w-[20%]   drop-shadow-lg bg-gray-100 p-2 border-blue-200  border-2 ml-1 rounded-lg"
                        placeholder="e.g. 110001"
                        maxLength={6}
                      />
                      {errors.postalCode && (
                        <div className="text-red-600 text-sm">{errors.postalCode}</div>
                      )}
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 bg-white text-gray-100 border border-gray-300 px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 hover:text-gray-900 transition"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-900 to-emerald-700 text-gray-700 font-semibold px-5 py-2 rounded-full shadow-lg hover:from-green-700 hover:to-emerald-800 transform hover:-translate-y-0.5 transition"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="sm:ml-10 border-gray-100 border-2 p-6 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-6 text-green-600">
                      <span className="text-4xl">ℐ</span>
                      <i>ncome</i>
                    </h2>
                    <p className="font-serif  text-gray-400">
                      Your income guides us in offering the best loan fit.
                    </p>
                    {/* Monthly Income */}
                    <div className="mb-6">
                      <label
                        className="block text-lg font-semibold mb-2 mt-5 text-gray-700"
                        htmlFor="yearlyIncome"
                      >
                        Yearly Income <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        id="yearlyIncome"
                        name="yearlyIncome"
                        placeholder="Enter your Yearly income"
                        value={form.yearlyIncome}
                        onChange={(e) =>
                          setForm({ ...form, yearlyIncome: e.target.value })
                        }
                        required
                        className="w-[70%] sm:w-[30%] p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                      />
                      {errors.yearlyIncome && (
                        <div className="text-red-600 text-sm">
                          {errors.yearlyIncome}
                        </div>
                      )}
                    </div>

                    {/* Income-related questions */}
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

                    {/* Tax Bracket */}
                    <div className="mt-8">
                      <p className="text-lg font-semibold mb-2 text-gray-700">
                        Are you in income tax bracket?{" "}
                        <span className="text-red-600">*</span>
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, inTaxBracket: "yes" })}
                          className={`px-6 py-1 bg-blue-300 rounded-full border-2 transition duration-200 ${form.inTaxBracket === "yes"
                            ? "bg-blue-400 border-gray-100 shadow-md"
                            : "border-gray-50 hover:bg-blue-500"
                            }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, inTaxBracket: "no" })}
                          className={`px-6 py-1 rounded-full bg-blue-300 border-2 transition duration-200 ${form.inTaxBracket === "no"
                            ? "bg-blue-400 border-gray-100 shadow-md"
                            : "border-gray-50 hover:bg-blue-500"
                            }`}
                        >
                          No
                        </button>
                      </div>
                      {errors.inTaxBracket && (
                        <div className="text-red-600 text-sm">
                          {errors.inTaxBracket}
                        </div>
                      )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 hover:text-gray-900 transition"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-900 to-emerald-700 text-gray-700 font-semibold px-5 py-2 rounded-full shadow-lg hover:from-green-700 hover:to-emerald-800 transform hover:-translate-y-0.5 transition"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <>
                    <div className="space-y-6 sm:ml-10 border-gray-300 border-2 p-6 rounded-lg shadow-2xl">
                      <h2 className="text-xl font-semibold">
                        Your monthly
                        <span className="text-green-600 font-serif"> Expenses</span>
                      </h2>
                      <p className="">
                        This amount reflects the total combined expenses of all
                        borrowers, if more than one person is applying for the loan.
                      </p>

                      {/* ₹ input field wrapper */}
                      <div style={{ position: "relative", display: "inline-block" }}>
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "10px",
                            transform: "translateY(-50%)",
                            color: "red",
                          }}
                        >
                          ₹
                        </span>

                        <input
                          type="number"
                          value={form.monthlyLivingExpenditure}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              monthlyLivingExpenditure: e.target.value,
                            })
                          }
                          className="w-full  pl-6 pr-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                          placeholder="Monthly Expenditure"
                          required
                        />
                      </div>

                      {errors.monthlyLivingExpenditure && (
                        <div className="text-red-600 text-sm">
                          {errors.monthlyLivingExpenditure}
                        </div>
                      )}
                      <div>
                        <h2 className="text-xl font-semibold mb-4">
                          Other
                          <span className="text-green-600 font-serif"> Expenses</span>
                        </h2>

                        {renderYesNoField(
                          "Do you have any other monthly expenses?",
                          "hasOtherExpenses",
                          "otherExpensesAmount",
                          "Enter monthly amount"
                        )}

                        {renderYesNoField(
                          "Do you have any another home loan?",
                          "hasAnotherHomeLoan",
                          "anotherHomeLoanAmount",
                          "Enter monthly amount"
                        )}

                        {renderYesNoField(
                          "Do you have any personal loans?",
                          "hasPersonalLoan",
                          "personalLoanAmount",
                          "Enter monthly amount"
                        )}
                        {renderYesNoField(
                          "Do you have any credit card debt?",
                          "hasCreditCardDebt",
                          "creditCardDebtAmount",
                          "Enter debt amount"
                        )}
                        {renderYesNoField(
                          "Do you have any investment loans?",
                          "hasInvestmentLoan",
                          "investmentLoanAmount",
                          "Enter monthly amount"
                        )}
                      </div>
                      <div className="flex justify-between mt-6">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 hover:text-gray-900 transition"
                        >
                          ← Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-900 to-emerald-700 text-gray-700 font-semibold px-5 py-2 rounded-full shadow-lg hover:from-green-700 hover:to-emerald-800 transform hover:-translate-y-0.5 transition"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {step === 4 && (
                  <div>
                    {eligibilityResult ? (
                      <div className="text-center p-10">
                        <h2 className="text-2xl font-bold mb-4">
                          {eligibilityResult.eligible
                            ? "Congratulations!"
                            : "Eligibility Status"}
                        </h2>
                        <p
                          className={`text-lg ${eligibilityResult.eligible
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                        >
                          {eligibilityResult.msg}
                        </p>
                        <button
                          onClick={handleStartOver}
                          className="mt-6 bg-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-700 transition"
                        >
                          Check Another Loan
                        </button>
                        {showPopup && (
                          <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                              <h3 className="text-xl font-semibold mb-3">
                                {eligibilityResult.eligible ? "Success ✅" : "Application Received"}
                              </h3>
                              <p className="mb-4">
                                {eligibilityResult.eligible
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
                    ) : (
                      <div className="space-y-2 sm:mb-15 sm:ml-10 border-gray-300 w-[100%] border-2 sm:px-15 px-5 py-10 rounded-lg shadow-2xl">
                        {/* Header */}
                        <h2 className="text-2xl font-extrabold text-gray-800 font-serif leading-tight">
                          Your Contact
                          <span className="text-green-600 font-serif italic text-3xl ml-2">
                            details
                          </span>
                        </h2>
                        <p className="text-gray-600 text-sm font-serif mb-5">
                          We’re here to help! Provide your contact details, and we'll
                          guide you toward the most suitable loan deals.
                        </p>

                        {/* First Name & Last Name */}
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* First Name */}
                          <div className="w-full md:w-[30%]">
                            <label className="block text-sm font-medium text-blue-900 mb-2">
                              First Name <span className="text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              value={form.firstName}
                              onChange={(e) =>
                                handleChange("firstName", e.target.value)
                              }
                              placeholder="Name"
                              className={`w-full px-4 py-3 rounded-lg border text-sm shadow-sm transition duration-200
                ${errors.firstName
                                  ? "border-pink-500 bg-pink-50 focus:outline-pink-600"
                                  : "border-gray-300 focus:outline-blue-500 hover:border-blue-400"
                                }`}
                            />
                            {errors.firstName && (
                              <p className="text-pink-600 text-xs mt-1">
                                {errors.firstName}
                              </p>
                            )}
                          </div>

                          {/* Last Name */}
                          <div className="w-full md:w-[30%]">
                            <label className="block text-sm font-medium text-blue-900 mb-2">
                              Last Name <span className="text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              value={form.lastName}
                              onChange={(e) => handleChange("lastName", e.target.value)}
                              placeholder="Title"
                              className={`w-full px-4 py-3 rounded-lg border text-sm shadow-sm transition duration-200
                ${errors.lastName
                                  ? "border-pink-500 bg-pink-50 focus:outline-pink-600"
                                  : "border-gray-300 focus:outline-blue-500 hover:border-blue-400"
                                }`}
                            />
                            {errors.lastName && (
                              <p className="text-pink-600 text-xs mt-1">
                                {errors.lastName}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Email */}
                          <div className="w-full md:w-[30%]">
                            <label className="block text-sm font-medium text-blue-900 mb-2">
                              Email <span className="text-red-600">*</span>
                            </label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => handleChange("email", e.target.value)}
                              placeholder="john.doe@example.com"
                              className={`w-full px-4 py-3 rounded-lg border text-sm shadow-sm transition duration-200
                      ${errors.email
                                  ? "border-pink-500 bg-pink-50 focus:outline-pink-600"
                                  : "border-gray-300 focus:outline-blue-500 hover:border-blue-400"
                                }`}
                            />
                            {errors.email && (
                              <p className="text-pink-600 text-xs mt-1">
                                {errors.email}
                              </p>
                            )}
                          </div>

                          {/* Phone */}
                          <div className="w-full md:w-[30%]">
                            <label className="block text-sm font-medium text-blue-900 mb-2">
                              Phone Number <span className="text-red-600">*</span>
                            </label>
                            <input
                              type="tel"
                              value={form.phoneNumber}
                              onChange={(e) =>
                                handleChange("phoneNumber", e.target.value)
                              }
                              placeholder="e.g. 602-602-602-6"
                              className={`w-full px-4 py-3 rounded-lg border text-sm shadow-sm transition duration-200
                      ${errors.phoneNumber
                                  ? "border-pink-500 bg-pink-50 focus:outline-pink-600"
                                  : "border-gray-300 focus:outline-blue-500 hover:border-blue-400"
                                }`}
                            />
                            {errors.phoneNumber && (
                              <p className="text-pink-600 text-xs mt-1">
                                {errors.phoneNumber}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between mt-6">
                          <button
                            type="button"
                            onClick={handleBack}
                            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 border border-gray-600 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 hover:text-gray-900 transition"
                          >
                            ← Back
                          </button>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-green-600 text-white  font-semibold px-6 py-1 rounded-full border-b-4 border-green-800 hover:bg-green-700 transition"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Footer />
      <style>
        {`
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .spin-slow {
      animation: spin-slow 6s linear infinite;
    }
  `}
      </style>
    </div>
  );
};

export default EligibilityFormPage;