const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
const playersRouter = require("./routes/players");
const matchesRouter = require("./routes/matches");
const prevMatchesRouter = require("./routes/prevMatches");

app.use("/exercises", exercisesRouter);
app.use("/players", playersRouter);
app.use("/users", usersRouter);
app.use("/matches", matchesRouter);
app.use("/prevMatches", prevMatchesRouter);

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
