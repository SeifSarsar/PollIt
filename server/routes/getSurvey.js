const express = require("express");
const router = express.Router();

const Survey = require("../models/survey");
const Vote = require("../models/vote");

router.get("/:id", (req, res, next) => {
  const idSurvey = req.params.id;

  Survey.findById(idSurvey)
    .then(survey => {
      Vote.find({ idsurvey: survey._id })
        .then(votes => {
          res.json({ survey: survey, votes: votes });
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
