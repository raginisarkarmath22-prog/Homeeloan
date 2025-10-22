// seoRoutes 
const express = require("express");
const router = express.Router();
const seoController = require("../controllers/seoController");

router.get("/:page", seoController.getSeo);
router.put("/:page", seoController.updateSeo);

module.exports = router;
