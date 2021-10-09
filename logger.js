const { createLogger, format, transports } = require("winston");
const { combine, timestamp, align, prettyPrint, colorize, errors } = format;

module.exports = createLogger({
  // exitOnError: false,
  transports: [
    new transports.File({ 
      filename: "./logs/logfile.log", 
      // handleExceptions: true, 
      maxsize: 10485760, 
      maxFiles: 5,
      json: true,
      format: combine(
        timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        prettyPrint(),
        colorize(),
      ),
    })
  ]
});
