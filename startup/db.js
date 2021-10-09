const logger = require("./logger");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => logger.info("Connected to database Vidly"))
    .catch((err) => logger.error(`Could not connect to Vidly ${err}`));
};
