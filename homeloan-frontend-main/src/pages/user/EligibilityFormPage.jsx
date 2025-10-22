import React, { useState } from "react";

const loanSteps = [
  "Loan details",
  "Your details",
  "Income & Employment",
  "Expenses",
  "Do I qualify ?",
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
          if (isRefinancing && borrow > worth) {
            newErrors.borrowAmount =
              "Borrow amount cannot be greater than property worth.";
          } else if ((isBuying || isBuilding) && borrow >= worth) {
            newErrors.borrowAmount =
              "Borrow amount must be less than property worth.";
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
          className={`px-4 py-0.5 m-2 rounded-4xl border ${
            form[yesNoField] === "yes"
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
          className={`px-4 py-0.5 m-2 rounded-4xl border ${
            form[yesNoField] === "no"
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
            className="w-[70%] sm:w-[30%] px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
          {errors[amountField] && (
            <div className="text-red-600 text-sm">{errors[amountField]}</div>
          )}
        </>
      )}
    </div>
  );
  return (
    <div className="flex min-h-screen pt-[96px] bg-[#517cd1]">
      {/* Sidebar Stepper */}
      {/* Sidebar Stepper - Hidden on mobile */}
      <div className="hidden md:flex w-1/6 h-1/6 flex-col mt-[5%]   bg-[#4f74bf3b] mr-1  items-start p-5 rounded-4xl relative">
        {loanSteps.map((label, idx) => (
          <div key={idx} className="relative flex items-start mb-10">
            {/* Dot */}
            <div className="relative z-10">
              <div
                className={`w-4 h-4 border-2 border-blue-950 border-dotted animate-spin rounded-full ${
                  step === idx ? "bg-green-600" : "bg-gray-300"
                }`}
              />
            </div>

            {/* Vertical Line */}
            {idx < loanSteps.length - 1 && (
              <div className="absolute top-4 left-1.5 h-10 border-l-2 border-gray-300 z-0" />
            )}

            {/* Label */}
            <span
              className={`ml-2 font-serif ${
                step === idx ? "text-gray-900 font-semibold" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-full h-[66%] bg-white md:p-6 p-2  rounded-2xl shadow-md">
        <div className="flex items-center gap-2 mt-2 mb-10 w-fit">
          <div className="text-sm uppercase text-white font-bold border-sky-700 border-b-4 py-2 px-4 rounded-3xl bg-[#517cd1]">
            {`${step + 1}/${loanSteps.length} • ${loanSteps[step]}`}
          </div>
        </div>

        {step === 0 && (
          <>
            <h2 className="text-3xl font-bold mb-2">
              Pre-qualify for a{" "}
              <span className="text-green-600">homeeloan</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Find out if you pre-qualify for a home loan in just 2 minutes with
              no credit check.
            </p>

            <p className="font-semibold mb-2">
              What is the loan for? <span className="text-red-600">*</span>
            </p>
            <div className="flex gap-4 mb-6 flex-wrap">
              {["i'm refinancing", "i'm buying", "i'm building"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleChange("loanPurpose", type)}
                  className={`px-6 py-2 border-b-2 hover:bg-sky-400 bg-blue-400 rounded-xl border text-sm capitalize ${
                    form.loanPurpose === type
                      ? "border-green-600 text-white font-semibold"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {form.loanPurpose && (
              <>
                <p className="font-semibold mb-2">
                  How will you use the property?{" "}
                  <span className="text-red-600">*</span>
                </p>
                <div className="flex gap-4 mb-6">
                  {["to live in", "an investment"].map((use) => (
                    <button
                      key={use}
                      onClick={() => handleChange("propertyUse", use)}
                      className={`px-6 py-1 hover:bg-sky-400 bg-blue-400 rounded-xl  border ${
                        form.propertyUse === use
                          ? "border-green-600  text-white font-semibold"
                          : "border-gray-300"
                      }`}
                    >
                      {use}
                    </button>
                  ))}
                </div>
                {errors.propertyUse && (
                  <div className="text-red-600 text-sm mb-2">
                    {errors.propertyUse}
                  </div>
                )}
              </>
            )}

            {/* After loan purpose buttons */}
            {errors.loanPurpose && (
              <div className="text-red-600 text-sm mb-2">
                {errors.loanPurpose}
              </div>
            )}

            {/* After property worth input */}
            {form.loanPurpose === "i'm refinancing" && form.propertyUse && (
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <p className="mb-1">
                    What is the property worth?{" "}
                    <span className="text-red-600">*</span>
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
                  {errors.propertyWorth && (
                    <div className="text-red-600 text-sm">
                      {errors.propertyWorth}
                    </div>
                  )}
                  <p className="text-[12px] ml-2 text-green-700">
                    An estimate is fine, we can change this later
                  </p>
                </div>
                <div>
                  <p className="mb-1">
                    How much are you looking to borrow?{" "}
                    <span className="text-red-600">*</span>
                  </p>
                  <input
                    type="number"
                    placeholder="eg..12356"
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
                    onChange={(e) => handleChange("loanTenure", e.target.value)}
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
            {form.loanPurpose === "i'm buying" && form.propertyUse && (
              <>
                <p className="font-semibold mt-6 mb-2">
                  Have you found a property yet?
                </p>
                <div className="flex gap-4 mb-6">
                  {["yes", "no"].map((ans) => (
                    <button
                      key={ans}
                      onClick={() => handleChange("foundProperty", ans)}
                      className={`px-6 py-1 hover:bg-sky-400 bg-blue-300  rounded-lg border ${
                        form.foundProperty === ans
                          ? "border-green-600 text-white font-semibold"
                          : "border-gray-300"
                      }`}
                    >
                      {ans.toUpperCase()}
                    </button>
                  ))}
                </div>

                {form.foundProperty === "yes" && (
                  <div className="grid gap-6">
                    <div>
                      <p className="mb-1">
                        What are you looking to pay for the property?
                      </p>
                      <input
                        type="number"
                        placeholder="eg..property worth"
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
                        placeholder="eg..borrow amount"
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
              </>
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
                      className={`px-6 py-1 hover:bg-sky-400 bg-blue-300 rounded-xl border ${
                        form.foundProperty === ans
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
          </>
        )}

        {step === 0 && (
          <div className="text-right mt-6 sm:mb-0 mb-5 mr-2">
            <button
              type="button"
              onClick={handleNext}
              className="bg-green-600 text-white font-semibold px-6 py-2 rounded-sm  border-b-3 shadow-sm border-t-1 border-l-2 border-r-2 border-teal-900 duration-200 hover:bg-green-700 transition"
            >
              Next →
            </button>
          </div>
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
                  key={type}
                  onClick={() => handleChange("applicantType", type)}
                  className={`px-6 py-2 rounded-xl border  text-sm ${
                    form.applicantType === type
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
                      key={status}
                      type="button"
                      onClick={() =>
                        setForm({ ...form, relationshipStatus: status })
                      }
                      className={`px-6 py-2 rounded-xl border transition-all duration-200 ${
                        form.relationshipStatus === status
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
                      className={`px-6 py-2 rounded-xl border text-sm ${
                        form.relationshipStatus === status
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
                          className={`px-6 py-1 rounded-xl bg-blue-400 border ${
                            form.secondBorrowerRelationStatus === status
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
                className="w-full px-4 py-2  rounded-xl border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 cursor-pointer transition duration-200"
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
                className={`w-[70%] md:w-[30%] px-4 py-3 rounded-xl border text-sm shadow-sm transition duration-200 
                    ${
                      errors.companyType
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
                className={`w-[70%] md:w-[30%] px-4 py-3 rounded-xl border text-sm shadow-sm transition duration-200 
                    ${
                      errors.companyName
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
                className={`w-[70%] md:w-[30%] px-4 py-3 rounded-xl border text-sm shadow-sm transition duration-200 
                    ${
                      errors.occupation
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
                className="bg-gray-300 text-gray-800  font-semibold px-6 py-2 rounded-sm  border-b-3 shadow-sm border-t-1 border-l-2 border-r-2 border-teal-900 duration-200 hover:bg-green-700 transition"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-green-600 text-white font-semibold px-6 py-2 rounded-sm  border-b-3 shadow-sm border-t-1 border-l-2 border-r-2 border-teal-900 duration-200 hover:bg-green-700 transition"
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
                  className={`px-6 py-1 bg-blue-300 rounded-full border-2 transition duration-200 ${
                    form.inTaxBracket === "yes"
                      ? "bg-blue-400 border-gray-100 shadow-md"
                      : "border-gray-50 hover:bg-blue-500"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, inTaxBracket: "no" })}
                  className={`px-6 py-1 rounded-full bg-blue-300 border-2 transition duration-200 ${
                    form.inTaxBracket === "no"
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
                className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-sm  border-b-3 shadow-sm border-t-1 border-l-2 border-r-2 border-teal-900 duration-200 hover:bg-green-700 transition"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-green-600 text-white font-semibold px-6 py-2 rounded-sm  border-b-3 shadow-sm border-t-1 border-l-2 border-r-2 border-teal-900 duration-200 hover:bg-green-700 transition"
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
                  className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-sm  border-b-3 shadow-sm border-t-1 border-l-2 border-r-2 border-teal-900 duration-200 hover:bg-green-700 transition"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-green-600 text-white font-semibold px-6 py-2 rounded-sm  border-b-3 shadow-sm border-t-1 border-l-2 border-r-2 border-teal-900 duration-200 hover:bg-green-700 transition"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            {eligibilityResult ? (
              <div className="text-center p-10">
                <h2 className="text-2xl font-bold mb-4">
                  {eligibilityResult.eligible
                    ? "Congratulations!"
                    : "Eligibility Status"}
                </h2>
                <p
                  className={`text-lg ${
                    eligibilityResult.eligible
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
                    <div className="bg-white p-6 rounded-xl shadow-xl text-center">
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
                      className={`w-full px-4 py-3 rounded-xl border text-sm shadow-sm transition duration-200 
                ${
                  errors.firstName
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
                      className={`w-full px-4 py-3 rounded-xl border text-sm shadow-sm transition duration-200 
                ${
                  errors.lastName
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
                      className={`w-full px-4 py-3 rounded-xl border text-sm shadow-sm transition duration-200 
                      ${
                        errors.email
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
                      className={`w-full px-4 py-3 rounded-xl border text-sm shadow-sm transition duration-200 
                      ${
                        errors.phoneNumber
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
                    className="bg-gray-300 text-gray-800 font-semibold px-6 rounded-4xl   border-b-3 shadow-sm border-t-1 border-l-2 border-r-2 border-teal-900 duration-200 hover:bg-green-700 transition"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-green-600 text-white  font-semibold px-6 py-2 rounded-full border-b-4 border-green-800 hover:bg-green-700 transition"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EligibilityFormPage;
