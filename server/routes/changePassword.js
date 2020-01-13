const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../models/user");

router.put("/", auth, (req, res, next) => {
  const userId = req.body.userId;
  const currentPassword = req.body.currentPassword;
  const password = req.body.password;

  User.findById(userId)
    .then(user => {
      if (user.password != currentPassword) {
        return res.status(400).json("Current password is invalid");
      }
      User.updateOne({ _id: userId }, { password: password })
        .then(user => {
          res.send({
            id: user._id,
            username: user.username,
            email: user.email
          });
        })
        .catch(err => {
          throw err;
        });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
