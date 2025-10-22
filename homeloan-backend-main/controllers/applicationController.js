const { saveApplication } = require("../models/applicationModel");

const submitApplication = async (req, res) => {
  try {
    const {
      fullName,
      mobileNumber,
      email,
      city,
      budget,
      remarks,
      projectName,
      projectLoanId,
    } = req.body;

    if (!fullName || !mobileNumber || !email || !city || !budget) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await saveApplication({
      fullName,
      mobileNumber,
      email,
      city,
      budget,
      remarks,
      projectName,
      projectLoanId,
    });

    res.status(200).json({ message: "✅ Application submitted successfully!" });
  } catch (error) {
    console.error("❌ Error submitting application:", error);
    res.status(500).json({ error: "Failed to submit application" });
  }
};

module.exports = { submitApplication };
