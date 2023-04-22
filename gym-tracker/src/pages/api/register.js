import dbPool from "../../connection.js";
const bcrypt = require("bcrypt");
export default function register(req, res) {
  const saltRounds = 10;
  const { emailRegister, passwordRegister } = req.body; // Downloading data from request

  // Hashing password
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) throw err;
    bcrypt.hash(passwordRegister, salt, function (err, hash) {
      if (err) throw err;
      const values = [emailRegister, hash];

      // Check if user already exists
      dbPool.query(
        "SELECT * FROM users WHERE email = ?",
        [emailRegister],
        (err, results) => {
          if (err) throw err;

          if (results.length > 0) {
            // User already exists
            res.status(409).json({ message: "User already exists" });
          } else {
            // Adding new user to database
            dbPool.query(
              "INSERT INTO users (email, password) VALUES (?, ?)",
              values,
              (err, results) => {
                if (err) throw err;
                res.status(201).json({ message: "User created successfully" });
              }
            );
          }
        }
      );
    });
  });
}
