const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

module.exports = db;
