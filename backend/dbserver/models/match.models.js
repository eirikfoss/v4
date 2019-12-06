const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    location: { type: String, required: true },
    teams: { type: Array, required: true },
    score: { type: Array, required: true }
  },
  { timestamps: true }
);

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
