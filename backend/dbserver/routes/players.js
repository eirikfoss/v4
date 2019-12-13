const router = require("express").Router();
let Player = require("../models/players.models");

router.route("/").get((req, res) => {
  Player.find()
    .then(players => res.json(players))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const stats = req.body.stats;
  const matches = req.body.matches;

  const newPlayer = new Player({ username, stats, matches });

  newPlayer
    .save()
    .then(() => res.json("Player Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Player.findById(req.params.id)
    .then(player => res.json(player))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Player.findById(req.params.id).then(player => {
    player.matches = req.body.matches;
    player.stats = req.body.stats;

    player
      .save()
      .then(() => res.json("Player updated"))
      .catch(err => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
