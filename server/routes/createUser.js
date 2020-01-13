const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  var user = req.body;

  user = new User({
    email: user.email,
    username: user.username,
    password: user.password
  });
  user
    .save()
    .then(user => {
      jwt.sign({ id: user._id }, "sefoune", (err, token) => {
        if (err) {
          throw err;
        }
        res.send({
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          }
        });
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
