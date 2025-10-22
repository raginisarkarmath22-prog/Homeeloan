// eligibilityRoutes.js 

const express = require("express");
const router = express.Router();
const {
  createEligibilityApplication,
  getEligibilityApplications,
} = require("../controllers/eligibilityController");

// POST: Submit new application
router.post("/eligibility-applications", createEligibilityApplication);

// GET: Fetch all applications
router.get("/eligibility-applications", getEligibilityApplications);

module.exports = router;
