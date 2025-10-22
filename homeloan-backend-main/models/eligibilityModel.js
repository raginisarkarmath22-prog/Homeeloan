// eligibility model 

const pool = require("../config/db");

const createEligibilityApplication = async (data) => {
  // Define the columns in the order they appear in the database table
  const columns = [
    'loan_purpose', 'property_use', 'found_property', 'when_to_buy', 'property_worth',
    'borrow_amount', 'loan_tenure', 'applicant_type', 'relationship_status',
    'second_borrower_relation_status', 'dependents', 'postal_code', 'company_type',
    'company_name', 'occupation', 'yearly_income', 'earn_additional_income',
    'additional_income_amount', 'receive_rental_income', 'rental_income_amount',
    'receive_non_taxable_income', 'non_taxable_income_amount', 'in_tax_bracket',
    'monthly_living_expenditure', 'has_other_expenses', 'other_expenses_amount',
    'has_another_home_loan', 'another_home_loan_amount', 'has_personal_loan',
    'personal_loan_amount', 'has_credit_card_debt', 'credit_card_debt_amount',
    'has_investment_loan', 'investment_loan_amount', 'first_name', 'last_name', 'email', 'phone_number',
    'interest_rate', 'is_eligible', 'eligibility_message', 'calculated_emi'
  ];

  // Map the data object to an array of values, ensuring order and handling missing fields with null
  const values = columns.map(col => data[col] ?? null);

  const sql = `
    INSERT INTO eligibility_applications (${columns.join(', ')})
    VALUES (${columns.map(() => '?').join(', ')})
  `;

  // Use .promise() to work with async/await and get an iterable result
  const [result] = await pool.execute(sql, values);
  return result.insertId;
};

module.exports = { createEligibilityApplication };
