const logger = require("../startup/logger");

module.exports = function (err, req, res, next) {
  logger.error(`Something failed. ${err}`)

  res.status(500).send("Something failed.");
};
