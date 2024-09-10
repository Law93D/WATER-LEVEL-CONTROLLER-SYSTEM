const mongoose = require('mongoose');

/**
 * System State Schema for MongoDB using Mongoose
 *
 * This schema defines the structure for the system state document in the MongoDB database.
 * It represents the state of the water control system, including the display status,
 * the state of pumps, valve, and whether the system is running.
 */
const systemStateSchema = new mongoose.Schema({
  display: {
    type: String,
    required: true, // Display text must be provided
    default: 'Idle' // Default system state when idle
  },
  pump1: {
    type: Boolean,
    required: true, // Boolean indicating whether pump 1 is on or off
    default: false // Default is off
  },
  pump2: {
    type: Boolean,
    required: true, // Boolean indicating whether pump 2 is on or off
    default: false // Default is off
  },
  valve: {
    type: Boolean,
    required: true, // Boolean indicating whether the valve is open or closed
    default: false // Default is closed
  },
  running: {
    type: Boolean,
    required: true, // Boolean indicating whether the system is running
    default: false // Default is not running
  }
});

/**
 * The `SystemState` model is used to interact with the system state collection
 * in the MongoDB database. This model allows querying and updating the system's
 * current state, including control over pumps, valves, and display status.
 */
module.exports = mongoose.model('SystemState', systemStateSchema);
