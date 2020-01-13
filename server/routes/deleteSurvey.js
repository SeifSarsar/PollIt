const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Vote = require("../models/vote");

const Survey = require("../models/survey");

router.delete("/:id", auth, (req, res, next) => {
  const surveyId = req.params.id;
  Survey.findByIdAndDelete(surveyId)
    .then(survey => {
      Vote.deleteMany({ idsurvey: survey._id })
        .then(() => {
          res.json(survey);
        })
        .catch(err => {
          throw err;
        });
    })
    .catch(err => next(err));
});

module.exports = router;
