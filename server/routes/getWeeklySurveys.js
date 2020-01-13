const express = require("express");
const router = express.Router();

const Survey = require("../models/survey");

router.get("/", (req, res, next) => {
  Survey.find({
    date: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) }
  })
    .sort({ popularity: -1 })
    .limit(20)
    .then(surveys => {
      res.json(surveys);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
