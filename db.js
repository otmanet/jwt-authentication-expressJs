// Load environment variables from a .env file into process.env
require("dotenv").config();

// Import the express-async-handler module to handle asynchronous functions in Express routes
const asyncHandler = require("express-async-handler");

// Import the default export from the mongoose module for MongoDB object modeling
const { default: mongoose } = require("mongoose");

// Define an asynchronous function to connect to MongoDB, wrapped with express-async-handler for error handling
const connectDB = asyncHandler(async (urlDB) => {
  // Connect to MongoDB using the connection URL provided
  return await mongoose
    .connect(urlDB, {
      useNewUrlParser: true, // Use the new URL parser instead of the deprecated one
      useUnifiedTopology: true, // Use the new unified topology layer to avoid warnings
    })
    .then(() => {
      // Log a success message when the connection is established
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      // Log an error message if the connection fails
      console.log("MongoDB connection error:", err);
    });
});

// Export the connectDB function so it can be used in other parts of the application
module.exports = connectDB;
