const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const prevMatchSchema = new Schema(
  {
    location: { type: String },
    teams: { type: Object },
    matchOver: { type: Boolean }
  },
  { timestamps: true }
);

const PrevMatch = mongoose.model("PrevMatch", prevMatchSchema);

module.exports = PrevMatch;
