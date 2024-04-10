const express = require("express");
const router = express.Router();
const db = require("../database");
const jwt = require("jsonwebtoken");
const { checkPassword, getHashPassword } = require("../methods");

/** 登入 */
router.post("/login", async (req, res) => {
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

/** 註冊 */
router.post("/regist", async (req, res) => {
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

/** 獲取使用者資料(包含追蹤數 簡介 貼文數) */
router.get("/accountInfo", async (req, res) => {
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

/** 修改使用者資料 */
router.patch("/accountInfo", async (req, res) => {
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

/** 推文 */
router.post("/tweet", async (req, res) => {
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

module.exports = router;
