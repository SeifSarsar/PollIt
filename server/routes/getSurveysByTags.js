const express = require("express");
const router = express.Router();

const Survey = require("../models/survey");

///EX: surveys/tags/country+big+...+...
router.get("/:tags", (req, res, next) => {
  var tagsString = req.params.tags;

  var tags = tagsString.split("+");

  Survey.find({
    tags: { $all: tags }
  })
    .then(surveys => {
      res.json(surveys);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
