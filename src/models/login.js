const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Add unique constraint
    timestamp: { type: Date, default: Date.now },
    success: { type: Boolean, required: true },
    // Other login-related fields
});

// Add index to the email field for faster queries
loginSchema.index({ email: 1 });

const LoginAttempt = mongoose.model('LoginAttempt', loginSchema);

module.exports = LoginAttempt;
