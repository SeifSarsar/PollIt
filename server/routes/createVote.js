const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Vote = require("../models/vote");
const Survey = require("../models/survey");
router.post("/", auth, (req, res, next) => {
  var vote = req.body;
  vote = new Vote({
    idsurvey: vote.idSurvey,
    username: vote.username,
    choice: vote.choice,
    comment: vote.comment
  });
  vote
    .save()
    .then(vote => {
      Survey.findByIdAndUpdate(
        vote.idsurvey,
        {
          $inc: {
            popularity: 1
          }
        },
        { new: true }
      ).then(survey => {
        console.log(survey);
      });
      res.json(vote);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
