const bcrypt = require("bcrypt");

exports.getHashPassword = (pw) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(pw, 12, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    })
  );
};

exports.checkPassword = (new_pw, old_pw) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(new_pw, old_pw, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  );
};
