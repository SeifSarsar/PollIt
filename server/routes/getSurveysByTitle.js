const express = require("express");
const router = express.Router();

const Survey = require("../models/survey");

router.get("/:title", (req, res, next) => {
  const title = req.params.title;
  Survey.find({ title: { $regex: title, $options: "i" } })
    .then(surveys => {
      res.json(surveys);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
