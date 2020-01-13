const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

router.get("/", auth, (req, res, next) => {
  const userId = req.user.id;

  User.findById(userId)
    .then(user => {
      res.json({
        id: user._id,
        username: user.username,
        email: user.email
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;

//ajouter login
