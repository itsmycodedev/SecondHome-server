const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success.");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

// to parse data for content-type: application/json
app.use(bodyParser.json());

// to parse data for content-type: x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send({
    error: false,
    message: "Server is healthy",
  });
});

app.use("/users", require("./routes/users"));

app.listen(process.env.PORT, () => {
  console.log("Server started listening on PORT : " + process.env.PORT);
});
