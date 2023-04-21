const mysql = require("mysql2");

const dbPool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: process.env.db_password,
  database: "gym_tracker",
});

module.exports = dbPool;
