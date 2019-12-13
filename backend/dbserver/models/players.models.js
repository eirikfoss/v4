const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const playerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3
    },
    matches: { type: Array },
    stats: { type: Object, required: true }
  },
  { timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
