// import multer from "multer";
const { changeToBase64 } = require("./module");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
require("dotenv").config();

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

// const upload = multer({ dest: "uploads/" });

app.use(express.json());
// app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  })
);

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

app.post("/regist", async (req, res) => {
  const { account, username, email, password } = req.body;
  let hashPassword = await getHashPassword(password);

  // 檢查 email 和 account 是否已存在
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ status: 0, message: "Internal Server Error" });
    }

    if (results.length > 0) {
      // 如果有重複的 email 或 account，回傳錯誤訊息
      return res
        .status(400)
        .json({ status: 0, message: "Email already exists." });
    }

    db.query(
      "SELECT * FROM users WHERE account = ?",
      [account],
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ status: 0, message: "Internal Server Error" });
        }

        if (results.length > 0) {
          // 如果有重複的 email 或 account，回傳錯誤訊息
          return res
            .status(400)
            .json({ status: 0, message: "Account already exists." });
        }

        // 如果沒有重複的 email 和 account，則新增使用者到資料庫
        db.query(
          "INSERT INTO users (username, email, account, password, confirmPassword) VALUES (?, ?, ?, ?, ?)",
          [username, email, account, hashPassword, hashPassword],
          (err) => {
            if (err) {
              return res
                .status(500)
                .json({ status: 0, message: "Internal Server Error" });
            }

            // 回傳成功訊息
            return res.status(200).json({
              status: 1,
              message: "Registered successfully.",
            });
          }
        );
      }
    );
  });
});

// Login in
app.post("/login", async (req, res) => {
  const { account, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE account = ?",
    [account],
    async (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ status: 0, message: "Internal Server Error" });
      }

      if (!results || results.length === 0) {
        return res
          .status(400)
          .json({ status: 0, message: "Account not found" });
      }

      const isValid = await checkPassword(password, results[0].password);

      if (!isValid) {
        return res.status(400).json({ status: 0, message: "password wrong" });
      }

      const token = jwt.sign(
        { userID: results[0].id },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        status: 1,
        message: "Success",
        userInfo: results,
        token: token,
      });
    }
  );
});

// BackStage Login
app.post("/admin/login", async (req, res) => {
  const { account, password } = req.body;

  if (account !== process.env.BACK_ACCOUNT) {
    return res
      .status(400)
      .json({ status: 0, message: "Can't not found account" });
  }
  if (password !== process.env.BACK_PASSWORD) {
    return res.status(400).json({ status: 0, message: "Password wrong" });
  }

  const token = jwt.sign(
    { account: account, password: password },
    process.env.BACK_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return res.status(200).json({ status: 1, message: "Success", token: token });
});

// BackStage get all users (exclude password, email, confirmPassword)
app.get("/admin/users", async (req, res) => {
  db.query(
    "SELECT id, account, username, email, avatarURL, coverURL  FROM users",
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ status: 0, message: "Internal Server Error" });
      }
      return res.json(results);
    }
  );
});

app.post("/tweet", async (req, res) => {
  const { userID, content } = req.body;

  db.query(
    "INSERT INTO posts (UserID, content) VALUES (?, ?)",
    [userID, content],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ status: 0, message: "Internal Server Error " });
      }

      return res.status(200).json({
        status: 1,
        message: "Registered successfully.",
      });
    }
  );
});

// Get all tweets, and return user with tweet
app.get("/tweets", async (req, res) => {
  const header = req.headers["authorization"];
  const token = header.split(" ")[1];

  if (!token) return res.status(400).send("請重新登入！");

  db.query(
    "SELECT p.id, p.content, p.userID, p.createAt, u.username, u.account, u.avatarURL FROM posts AS p JOIN users AS u ON p.UserID = u.id",
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ status: 0, message: "Internal Server Error" });
      }

      return res.status(200).json(results);
    }
  );
});

// 獲取使用者資料(包含追蹤數 簡介 貼文數)
app.get("/accountInfo", async (req, res) => {
  const header = req.headers["authorization"];
  const token = header.split(" ")[1];

  if (!token)
    return res.status(400).json({ status: 0, message: "Can't found a token" });

  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  db.query(
    "SELECT u.*, COUNT(DISTINCT p.id) AS post_count, COUNT(DISTINCT f.followerID) AS follower_count, COUNT(DISTINCT f.followingID) AS following_count FROM users u LEFT JOIN posts p ON p.UserID = u.id LEFT JOIN follows f ON f.followerID = u.id OR f.followingID = u.id WHERE u.id = ?",
    [decoded.userID],
    (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ status: 0, message: "Internal Server Error" });
      }

      if (!results[0].avatarURL) {
        results[0].avatarURL = defaultAvatarURL;
      } else {
        results[0].avatarURL = changeToBase64(results[0].avatarURL);
      }

      if (!results[0].coverURL) {
        results[0].coverURL = defaultCoverURL;
      } else {
        results[0].coverURL = changeToBase64(results[0].coverURL);
      }

      return res
        .status(200)
        .json({ status: 1, message: "Success!", userInfo: results?.[0] });
    }
  );
});

// 修改使用者資料
app.patch("/accountInfo", async (req, res) => {
  const updateData = req.body.data;
  const userID = req.body.userID;

  const syntax = [];

  for (let key in updateData) {
    syntax.push(`${key} = '${updateData[key]}'`);
  }

  if (syntax) {
    console.log(updateData, userID, syntax);
    const query = `UPDATE users SET ${syntax.join(", ")} WHERE id = ?`;

    db.query(query, [userID], (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ status: 0, message: "Internal Server Error" });
      }

      return res.status(200).json({ status: 1, message: "Success!" });
    });
  }
});

/** 監聽port */
app.listen(port, () => {
  console.log(`Listening on port ${port}......`);
});

function getHashPassword(pw) {
  return new Promise((resolve, reject) =>
    bcrypt.hash(pw, 12, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    })
  );
}

function checkPassword(new_pw, old_pw) {
  return new Promise((resolve, reject) =>
    bcrypt.compare(new_pw, old_pw, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  );
}
