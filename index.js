const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config()
const genres = require("./routes/genres");

app.use(express.json());
app.use(helmet());
app.use("/api/genres", genres);

// If you want to change node app env then assign process.env.NODE_ENV to your desired state.
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled.");
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
