const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const prevMatchSchema = new Schema(
  {
    match: { type: Object }
  },
  { timestamps: true }
);

const PrevMatch = mongoose.model("PrevMatch", prevMatchSchema);

module.exports = PrevMatch;
