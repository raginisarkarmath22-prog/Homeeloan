// eligibilityController.js 
const db = require("../config/db");
const createEligibilityApplication = async (req, res) => {
  try {
    const applicationData = req.body;

    if (!applicationData || Object.keys(applicationData).length === 0) {
      return res
        .status(400)
        .json({ message: "Bad Request: No data provided." });
    }

    const [result] = await db
      .promise()
      .query("INSERT INTO eligibility_applications SET ?", [applicationData]);

    res
      .status(201)
      .json({
        message: "Application submitted successfully",
        id: result.insertId,
      });
  } catch (error) {
    console.error("Error saving eligibility application:", error);
    res
      .status(500)
      .json({ message: "Failed to submit application", error: error.message });
  }
};

// Get all applications
const getEligibilityApplications = async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM eligibility_applications ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching eligibility applications:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch applications", error: error.message });
  }
};

module.exports = {
  createEligibilityApplication,
  getEligibilityApplications,
};
