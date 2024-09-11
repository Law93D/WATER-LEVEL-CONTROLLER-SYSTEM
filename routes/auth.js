const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model for MongoDB
const jwt = require('jsonwebtoken'); // Import JWT for token creation
require('dotenv').config(); // Load environment variables from .env file

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 *
 * This route handles user registration by accepting a username and password.
 * It creates a new user in the database and responds with a success message.
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body; // Extract username and password from the request body
  try {
    const user = new User({ username, password }); // Create a new user instance
    await user.save(); // Save the new user to the database
    res.status(201).json({ message: 'User registered' }); // Respond with success message
  } catch (err) {
    if (err.code === 11000) { // Duplicate key error
      res.status(400).json({ error: 'Username already exists' });
    } else {
    res.status(400).json({ error: err.message });
    } // Handle validation or saving errors
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate a user and return a JWT token
 * @access  Public
 *
 * This route handles user login by validating the provided username and password.
 * If valid, it generates a JWT token and returns it to the client for authentication.
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Extract username and password from the request body
  try {
    const user = await User.findOne({ username }); // Find user by username
    if (!user || !(await user.comparePassword(password))) {
      // If user is not found or password doesn't match, return an error
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    // Generate a JWT token valid for 1 hour
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
    // Respond with the generated token
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle server errors
  }
});

module.exports = router;
