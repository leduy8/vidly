const express = require("express");
const mongoose = require("mongoose");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const genres = require("./routes/genres");
const customers = require("./routes/customers");

app.use(express.json());
app.use(helmet());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

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
