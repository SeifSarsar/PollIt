const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.get("/:email/:password", (req, res, next) => {
  const { email, password } = req.params;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json("This email does not exist");
      }
      if (user.password != password) {
        return res.status(400).json("The password is invalid");
      }
      jwt.sign({ id: user._id }, "sefoune", (err, token) => {
        if (err) {
          next(err);
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

//ajouter login
