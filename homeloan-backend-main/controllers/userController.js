const db = require("../config/db");

const registerUser = (req, res) => {
  const { name, surname, dob, mobile, email, password } = req.body;

  if (!name || !surname || !mobile || !email || !password) {
    return res.status(400).json({ error: "Please fill all required fields." });
  }

  const sql = `INSERT INTO users (name, surname, dob, mobile, email, password)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, surname, dob, mobile, email, password], (err, result) => {
    if (err) {
      console.error("Registration Error:", err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ error: "Email already exists." });
      }
      return res.status(500).json({ error: "Server error. Try again." });
    }
    return res.status(201).json({ message: "User registered successfully!" });
  });
};

module.exports = { registerUser };
