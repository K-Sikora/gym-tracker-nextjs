import dbPool from "../../connection.js";

export default function handler(req, res) {
  dbPool.query("SELECT * FROM Workouts", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
}
