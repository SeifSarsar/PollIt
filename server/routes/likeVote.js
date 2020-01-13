const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Vote = require("../models/vote");
router.put("/", auth, (req, res, next) => {
  var vote = req.body.vote;
  var userId = req.body.userId;

  Vote.findByIdAndUpdate(
    vote._id,
    {
      $push: { likes: userId }
    },
    { new: true }
  )
    .then(vote => {
      res.json(vote);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
