import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mysql from "mysql2";
dotenv.config();

const app = express();

/** DB設定 */
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

/** DB連線 */
db.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Connect Success!!!");
});

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  })
);

const port = process.env.PORT;

/** 登入 */
app.post("/login", (req, res) => {
  console.log(req.body);
});

/** 監聽port */
app.listen(port, () => {
  console.log(`Listiening on port ${port}......`);
});
