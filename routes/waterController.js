const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import the authentication middleware
const SystemState = require('../models/SystemState'); // Import the SystemState model for MongoDB

/**
 * @route   GET /api/water/status
 * @desc    Get the current water system status
 * @access  Protected (Requires authentication)
 *
 * This route fetches the current state of the water system from the database,
 * including the status of pumps, valve, sensors, and display.
 * It responds with the current state in JSON format.
 */
router.get('/status', authMiddleware, async (req, res) => {
  try {
    const systemState = await SystemState.findOne();
    res.json(systemState);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

/**
 * @route   POST /api/water/start
 * @desc    Start the water system (pumps on, valve closed)
 * @access  Protected (Requires authentication)
 *
 * This route initiates the water control system by turning on both pumps
 * and ensuring the valve is closed. The updated system state is saved to
 * the database, and a real-time update is emitted to all connected clients
 * via Socket.io.
 */
router.post('/start', authMiddleware, async (req, res) => {
  try {
    const systemState = await SystemState.findOne();
    if (!systemState.running) {
      // Update system state to indicate that it's running
      systemState.running = true;
      systemState.display = 'Low Level - Filling';
      systemState.pump1 = true;
      systemState.pump2 = true;
      systemState.valve = false;

      await systemState.save(); // Save the updated state to the database
      req.io.emit('update', systemState); // Emit real-time update to connected clients

      res.json(systemState); // Return the updated state
    } else {
      res.status(400).json({ message: 'System is already running' }); // Handle if system is already running
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message }); // Handle server errors
  }
});

/**
 * @route   POST /api/water/stop
 * @desc    Stop the water system (pumps off, valve closed)
 * @access  Protected (Requires authentication)
 *
 * This route stops the water control system by turning off the pumps
 * and ensuring the valve is closed. The updated system state is saved
 * to the database, and a real-time update is emitted to all connected
 * clients via Socket.io.
 */
router.post('/stop', authMiddleware, async (req, res) => {
  try {
    const systemState = await SystemState.findOne();
    if (systemState.running) {
      // Update system state indicate it's stopped
      systemState.running = false;
      systemState.display = 'System Stopped';
      systemState.pump1 = false;
      systemState.pump2 = false;
      systemState.valve = false;

      await systemState.save(); // Save the updated state to the database
      req.io.emit('update', systemState); // Emit real-time update to connected clients

      res.json(systemState); // Return the updated state
    } else {
      res.status(400).json({ message: 'System is already stopped' }); // Handle if system is already stopped
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message }); // Handle server errors
  }
});

/**
 * @route   POST /api/water/high_level_sensor
 * @desc    Simulate the high-level sensor triggering the system to discharge water
 *          (pumps off, valve open)
 * @access  Protected (Requires authentication)
 *
 * This route simulates the high-level sensor being activated, which
 * causes the pumps to stop and the valve to open for water discharge.
 * The updated system state is saved to the database, and a real-time
 * update is emitted to all connected clients via Socket.io.
 */
router.post('/high_level_sensor', authMiddleware, async (req, res) => {
  try {
    const systemState = await SystemState.findOne();
    if (systemState.running) {
      // Update system state to indicate high-level sensor triggered discharge
      systemState.display = 'Running - Discharging';
      systemState.pump1 = false;
      systemState.pump2 = false;
      systemState.valve = true;

      await systemState.save(); // Save the updated state to the database
      req.io.emit('update', systemState); // Emit real-time update to connected clients

      res.json(systemState); // Return the updated state
    } else {
      res.status(400).json({ message: 'System is not running' }); // Handle if system isn't running
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message }); // Handle server errors
  }
});

module.exports = router;