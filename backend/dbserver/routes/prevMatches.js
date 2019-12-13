const router = require("express").Router();
let PrevMatch = require("../models/prevMatches.models");

router.route("/").get((req, res) => {
  PrevMatch.find()
    .then(prevMatch => res.json(prevMatch))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const match = req.body.match;

  const newMatch = new PrevMatch({
    match
  });

  newMatch
    .save()
    .then(() => res.json(newMatch._id))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  PrevMatch.findById(req.params.id)
    .then(prevMatch => res.json(prevMatch))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  PrevMatch.findByIdAndDelete(req.params.id)
    .then(() => res.json("Match deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  PrevMatch.findById(req.params.id).then(prevMatch => {
    prevMatch.score = req.body.score;

    prevMatch
      .save()
      .then(() => res.json("Match updated"))
      .catch(err => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
