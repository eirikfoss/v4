const router = require("express").Router();
let Match = require("../models/match.models");

router.route("/").get((req, res) => {
  Match.find()
    .then(match => res.json(match))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const teams = req.body.teams;
  const location = req.body.location;
  const score = req.body.score;

  const newMatch = new Match({
    teams,
    location,
    score
  });

  newMatch
    .save()
    .then(() => res.json(newMatch._id))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Match.findById(req.params.id)
    .then(match => res.json(match))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Match.findByIdAndDelete(req.params.id)
    .then(() => res.json("Match deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Match.findById(req.params.id).then(match => {
    match.score = req.body.score;

    match
      .save()
      .then(() => res.json("Match updated"))
      .catch(err => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
