/**
 * Express Server with MongoDB, Socket.io, and Water Controller API
 * 
 * This Node.js server application uses Express for handling routes,
 * Mongoose for MongoDB interactions, and Socket.io for real-time communication.
 * 
 * Environment variables:
 * - MONGO_URI: MongoDB connection string
 * - PORT: Port number for the server to listen on
 */

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/auth');
const waterControllerRoutes = require('./routes/waterController');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware to attach io to req
app.use((req, res, next) => {
    req.io = io; // Attach io to req
    next();
  });

/**
 * Initial system state for the water control system.
 * - display: Current status of the system (e.g., 'Idle').
 * - pump1, pump2, valve: Boolean values representing the state of each component.
 * - running: Indicates whether the system is running.
 */
let systemState = {
    display: 'Idle',
    pump1: false,
    pump2: false,
    valve: false,
    running: false
};

// Middleware to parse JSON bodies
app.use(express.json());

/**
 * API Routes:
 * - /api/auth: Handles authentication-related actions (login, registration, etc.).
 * - /api/water: Water controller API, secured with authMiddleware.
 */
app.use('/api/auth', authRoutes);
app.use('/api/water', authMiddleware, waterControllerRoutes);

/**
 * MongoDB connection using Mongoose.
 * MONGO_URI is stored in the .env file.
 * If the connection is successful, a message is logged to the console.
 * If an error occurs, it is logged.
 */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

/**
 * Handle socket connection for real-time updates.
 * - Sends current system state to a new client when connected.
 * - Logs connection and disconnection events.
 */
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.emit('update', systemState); // Send current state to new client

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

/**
 * Start the server and listen on the specified port.
 * PORT is either set via environment variable or defaults to 5000.
 */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});