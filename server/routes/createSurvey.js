const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Survey = require("../models/survey");

router.post("/", auth, (req, res, next) => {
  var survey = req.body;
  survey = new Survey({
    username: survey.username,
    title: survey.title,
    choices: survey.choices,
    tags: survey.tags
  });
  survey
    .save()
    .then(survey => {
      res.json(survey);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
