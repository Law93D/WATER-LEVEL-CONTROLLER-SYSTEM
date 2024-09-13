const jwt = require('jsonwebtoken');
const logger = require('../logger'); // import logger
require('dotenv').config(); // Load environment variables from .env file

/**
 * Authentication Middleware
 *
 * This middleware function checks if a valid JWT (JSON Web Token) is present in the request's `Authorization` header.
 * If the token is missing or invalid, it sends an appropriate error response.
 * If the token is valid, the user information is decoded and attached to the `req.user` object, allowing the request to proceed.
 *
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @param {function} next - The next middleware function in the stack
 */

const authMiddleware = (req, res, next) => {
  logger.debug('Auth middleware started'); // logging the start of auth middleware
  // Retrieve token from the Authorization header
  const authHeader = req.header('Authorization');

  // If no token is provided, deny access
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.error('Access denied. No token provided.'); // Log the error
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Check if the header contains the "Bearer" token format
  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    logger.error('Access denied. malformed token provided.'); // Log the error
    return res.status(401).json({ message: 'Access denied. Malformed token.' });
  }

  try {
    // Verify the token using the secret from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    logger.info('Access granted: token successfully verified');

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Call the next middleware function
    next();
  } catch (err) {
    logger.error('Access denied. invalid token', err); // Log the error
    // If the token is invalid, return an error response
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
