const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    location: { type: String, required: true },
    teams: { type: Object, required: true },
    matchOver: { type: Boolean, required: true }
  },
  { timestamps: true }
);

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
