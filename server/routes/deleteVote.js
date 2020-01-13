const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Vote = require("../models/vote");
const Survey = require("../models/survey");

router.delete("/:id", auth, (req, res, next) => {
  const voteId = req.params.id;
  Vote.findByIdAndDelete(voteId)
    .then(vote => {
      {
        Survey.findByIdAndUpdate(
          vote.idsurvey,
          {
            $inc: {
              popularity: -1
            }
          },
          { new: true }
        ).then(survey => console.log(survey));
        res.json(vote);
      }
    })
    .catch(err => next(err));
});

module.exports = router;
