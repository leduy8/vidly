const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

app.use(express.json());
app.use(helmet());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to database Vidly"))
  .catch((err) => console.log(`Could not connect to Vidly ${err}`));

// If you want to change node app env then assign process.env.NODE_ENV to your desired state.
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled.");
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
