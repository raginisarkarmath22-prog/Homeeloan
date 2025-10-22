require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const bankRoutes = require("./routes/bankRoutes");
const userRoutes = require("./routes/userRoutes");
const seoRoutes = require("./routes/seoRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
// app.use(cors({ origin: 'https://homeeloan.com' }));

app.use(cors());
app.use(express.json());

const eligibilityRoutes = require("./routes/eligibilityRoutes");

app.use("/api", bankRoutes);
app.use("/api", userRoutes);
app.use("/api", eligibilityRoutes);
app.use("/api/seo", seoRoutes);

app.use("/api/application", applicationRoutes);

// app.use("/api/application",applicationRoutes);
// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

module.exports = app;
