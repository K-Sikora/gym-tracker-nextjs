import dbPool from "../../connection.js";
import bcrypt from "bcrypt";

export default function login(req, res) {
  const { emailLogin, passwordLogin } = req.body;
  dbPool.query(
    "SELECT * FROM users WHERE email = ?",
    [emailLogin],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ Message: "Internal Server Error" });
        return;
      }
      if (results && results.length > 0) {
        console.log(results[0]);
        const user = results[0];
        bcrypt.compare(passwordLogin, user.password, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ Message: "Internal Server Error" });
            return;
          }
          if (result === true) {
            res.status(200).json({ Message: "Login Successful" });
          } else {
            res.status(401).json({ Message: "Invalid Credentials" });
          }
        });
      } else {
        res.status(401).json({ Message: "Invalid Credentials" });
      }
    }
  );
}
