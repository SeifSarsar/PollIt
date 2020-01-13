const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Survey = require("../models/survey");

const Vote = require("../models/vote");

router.get("/:username", auth, (req, res, next) => {
  const username = req.params.username;

  Vote.find({ username })
    .populate({ path: "idsurvey", model: Survey })
    .then(votes => {
      var surveys = votes.map(vote => {
        return vote["idsurvey"];
      });
      res.json(surveys);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
