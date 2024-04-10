const express = require("express");
const router = express.Router();

/** 登入 */
router.post("/admin/login", async (req, res) => {
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

/** 獲取使用者資料 */
router.get("/admin/users", async (req, res) => {
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

module.exports = router;
