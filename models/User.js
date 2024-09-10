const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt for hashing passwords

/**
 * User Schema for MongoDB using Mongoose
 *
 * This schema defines the structure for user documents in the MongoDB database.
 * Each user has a unique username and a hashed password.
 */
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

/**
 * Middleware to hash the password before saving the user.
 *
 * - Before saving a user, this middleware checks if the password field has been modified.
 * - If the password is new or has been changed, it is hashed using bcrypt.
 * - The `next` function is called to proceed with saving the user.
 */
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt of 10 rounds
  }
  next(); // Continue with the save operation
});

/**
 * Method to compare the candidate password with the stored hashed password.
 *
 * - This method is used during login to compare the user's input password
 *   with the hashed password stored in the database.
 *
 * @param {string} candidatePassword - The plaintext password provided by the user.
 * @returns {Promise<boolean>} - Returns true if the passwords match, false otherwise.
 */
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // Compare input password with the stored hash
};

// Export the User model for use in other parts of the application
module.exports = mongoose.model('User', UserSchema);
