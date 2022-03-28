const winston = require("winston");
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: "error",
  format: combine(timestamp(), json()),
  defaultMeta: { service: "user-service" },
  transports: [
    //new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console(),
  ],
});

module.exports = logger;
