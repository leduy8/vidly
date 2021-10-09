const express = require("express");
const app = express();

require("./startup/config");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();
const logger = require("./startup/logger");

const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info(`Listening on port ${port}...`);
});
