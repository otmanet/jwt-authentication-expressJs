// Import Mongoose to define and interact with MongoDB models
const mongoose = require("mongoose");

// Define the user schema with fields and validation rules
const userSchema = new mongoose.Schema({
  // First name of the user, required field
  firstName: {
    type: String,
    required: true,
  },

  // Last name of the user, required field
  lastName: {
    type: String,
    required: true,
  },

  // Username of the user, must be unique and required
  userName: {
    type: String,
    unique: true,
    required: true,
  },

  // Password of the user, must be unique and required
  password: {
    type: String,
    required: true,
  },

  // Email address of the user, must be unique, required, trimmed, and converted to lowercase
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
  },

  // Indicates if the user is deleted, defaults to false
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Export the User model based on the userSchema
module.exports = mongoose.model("User", userSchema);
