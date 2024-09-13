const winston = require('winston');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console()
  ]
});

module.exports = logger;
