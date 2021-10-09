require("dotenv").config();
const logger = require("./logger");

module.exports = function () {
  if (!process.env.secretKey) {
    logger.error("FATAL ERROR: secretKey is not defined.");
    process.exit(1);
  }
}