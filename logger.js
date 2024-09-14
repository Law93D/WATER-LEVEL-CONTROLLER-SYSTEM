const winston = require('winston');
const { combine, timestamp, json } = winston.format;

/**
 * Logger configuration using winston.
 *
 * The logger is set to output logs in JSON format with timestamps.
 * There are two transports:
 * - File transport: Writes error logs (level 'error') to 'error.log'
 * - Console transport: Outputs all logs (level 'debug' and above) to the console
 */

const logger = winston.createLogger({
  level: 'debug', // Log everything from 'debug' level and above
  format: combine(
    timestamp(), // Adds a timestamp to each log entry
    json() // Formats the logs as JSON objects
  ),
  transports: [
    // Logs all error messages to a file called 'error.log'
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Logs all messages (debug and above) to the console
    new winston.transports.Console()
  ]
});

// Export the logger for use in other parts of the application
module.exports = logger;
