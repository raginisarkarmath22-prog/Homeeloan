// controllers/bankController.js
const { getBanks } = require("../services/bankService"); // ✅ correct way to import

const getBanksHandler = async (req, res) => {
  try {
    const banks = await getBanks();
    res.status(200).json(banks);
  } catch (error) {
    console.error("Error fetching banks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getBanksHandler };
