const pool = require("../config/db");

const saveApplication = async (data) => {
  const {
    fullName,
    mobileNumber,
    email,
    city,
    budget,
    remarks,
    projectName,
    projectLoanId,
  } = data;

  const [result] = await pool.promise().execute(
    `INSERT INTO loan_applications 
    (full_name, mobile_number, email, city, budget, remarks, project_name, project_loan_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [fullName, mobileNumber, email, city, budget, remarks, projectName, projectLoanId]
  );

  return result;
};

module.exports = { saveApplication };
