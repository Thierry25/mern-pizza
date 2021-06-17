const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://Thierry:hUjQcq5UrD7uIgMt@cluster0.h5s1m.mongodb.net/mern-pizza";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var database = mongoose.connection;

database.on("connected", () => {
  console.log("Mongo DB Connection Successful");
});

database.on("error", () => {
  console.log("Mongo DB connection failed");
});

module.exports = mongoose;
