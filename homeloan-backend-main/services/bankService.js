// services/bankService.js 
const db = require("../config/db"); // Make sure this points to your correct DB connection

const getBanks = async () => {
  const [banks] = await db.promise().query("SELECT * FROM banks");
  const [docs] = await db.promise().query("SELECT * FROM bank_documents");

  const bankMap = banks.map((bank) => {
    const documentation = docs
      .filter((doc) => doc.bank_id === bank.id)
      .map((doc) => doc.document);

    return {
      ...bank,
      documentation,
    };
  });

  return bankMap;
};

module.exports = { getBanks };
