// import multer from "multer";
const { changeToBase64 } = require("./module");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./database");

const backStage = require("./router/backStage");
const frontStage = require("./router/frontStage");

const app = express();

/** DB連線 */
db.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Connect Success!!!");
});

// const upload = multer({ dest: "uploads/" });

app.use(express.json());
// app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  })
);
app.use(backStage);
app.use(frontStage);

const port = process.env.PORT;

// const storageAvatar = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/avatarImg/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const storageCover = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/coverImg/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// 創建 Multer 實例
// const uploadAvatar = multer({ dest: "uploads/" });
// const uploadCover = multer({ dest: "uploads/" });

// app.patch("/upload/avatarImg", uploadAvatar.single("avatarImg"), (req, res) => {
//   const base64Data = req.body.avatarImg;
//   const userID = Number(req.body.userID);

//   const dataBuffer = Buffer.from(base64Data.split(",")[1], "base64");

//   const query = "UPDATE users SET avatarURL = ? WHERE id = ?";

//   db.query(query, [dataBuffer, userID], (err) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ status: 0, message: "Internal Server Error" });
//     }

//     return res.status(200).json({ status: 1, message: "Success" });
//   });
// });

// app.patch("/upload/coverImg", uploadCover.single("coverImg"), (req, res) => {
//   const base64Data = req.body.coverImg;
//   const userID = Number(req.body.userID);

//   const dataBuffer = Buffer.from(base64Data.split(",")[1], "base64");

//   const query = "UPDATE users SET coverURL = ? WHERE id = ?";

//   db.query(query, [dataBuffer, userID], (err) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ status: 0, message: "Internal Server Error" });
//     }

//     return res.status(200).json({ status: 1, message: "Success" });
//   });
// });

/** 監聽port */
app.listen(port, () => {
  console.log(`Listening on port ${port}......`);
});
