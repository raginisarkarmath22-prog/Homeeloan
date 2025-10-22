
// eligibilityService
// Helper function to convert various key formats (camelCase, lowercase) to snake_case
const toSnakeCase = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

const calculateEligibility = (formData) => {
  // This is a simplified example. Your actual business logic will be more complex.
  // Use incoming keys, which might be inconsistent (e.g., yearly_income, loantenure)
  const { yearly_income, borrow_amount, loantenure, monthly_living_expenditure } = formData;

  // Basic check for required fields for calculation
  if (!yearly_income || !borrow_amount || !loantenure) {
      throw new Error("Missing required fields for eligibility calculation.");
  }

  // Calculate total income from all sources, similar to frontend logic
  const total_yearly_income =
    Number(formData.yearly_income || 0) +
    Number(formData.additional_income_amount || 0) +
    Number(formData.rental_income_amount || 0) +
    Number(formData.non_taxable_income_amount || 0);

  // Apply tax deduction if applicable
  const net_yearly_income =
    formData.in_tax_bracket === "yes"
      ? total_yearly_income * 0.8 // Assuming 20% tax
      : total_yearly_income;

  const monthly_income = net_yearly_income / 12;

  // Example: A more realistic interest rate might be determined by other factors.
  const interest_rate = 9.0; 
  const r = interest_rate / 100 / 12; // Monthly interest rate
  const n = Number(loantenure) * 12; // Number of months
  const calculated_emi =
    (Number(borrow_amount) * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1);

  // Simplified Debt-to-Income (DTI) ratio check, including all debts
  const otherMonthlyDebts =
    (Number(formData.another_home_loan_amount) || 0) +
    (Number(formData.personal_loan_amount) || 0) +
    (Number(formData.credit_card_debt_amount) || 0) +
    (Number(formData.investment_loan_amount) || 0); // Added investment loan

  const totalMonthlyDebt = calculated_emi + (Number(monthly_living_expenditure) || 0) + otherMonthlyDebts;
  const dti = (totalMonthlyDebt / monthly_income);

  let is_eligible = false;
  let eligibility_message = "";

  // Example rule: Debt-to-Income ratio should be less than 45%
  if (dti < 0.45 && isFinite(dti)) {
    is_eligible = true;
    eligibility_message = "Congratulations! You are likely eligible for the loan.";
  } else {
    is_eligible = false;
    eligibility_message = "Your EMI exceeds the recommended limit. Please contact us for assistance.";
  }

  // Combine original data with calculated results.
  const combinedData = {
    ...formData,
    loan_tenure: formData.loantenure, // Correct the key
    interest_rate,
    is_eligible,
    eligibility_message,
    calculated_emi: parseFloat(calculated_emi.toFixed(2)),
  };

  // Convert all keys to snake_case for database insertion.
  return Object.entries(combinedData).reduce((acc, [key, value]) => {
    acc[toSnakeCase(key)] = value;
    return acc;
  }, {});
};

module.exports = { calculateEligibility };