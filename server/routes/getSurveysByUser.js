const express = require("express");
const router = express.Router();

const Survey = require("../models/survey");

router.get("/:username", (req, res, next) => {
  const username = req.params.username;

  Survey.find({ username })
    .then(surveys => {
      res.json(surveys);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
