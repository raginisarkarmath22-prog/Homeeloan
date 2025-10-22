const express = require('express');
const router = express.Router();
const { getBanksHandler } = require("../controllers/bankController");

// Route to fetch all banks
router.get("/banks", getBanksHandler);

module.exports = router;
