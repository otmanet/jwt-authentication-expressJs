// Load environment variables from the .env file located in the same directory as this file
require("dotenv").config({ path: __dirname + "/.env" });

// Import the connectDB function from the db module to establish a connection with MongoDB
const connectDB = require("./db");

// Import the HTTP module to create an HTTP server
const http = require("http");

// Import the Express app instance from the app module
const app = require("./app");

// Import the express-async-handler module to handle asynchronous functions in Express routes
const asyncHandler = require("express-async-handler");

// Set the port number from the environment variables or use 8080 as the default
const PORT = process.env.PORT || 8080;

// Create an HTTP server instance, passing in the Express app as the request handler
const server = http.createServer(app);

// Function to start the server using an asynchronous handler
const startServer = asyncHandler(async () => {
  // connected mongoDB :
  await connectDB(process.env.MONGODB_URL);
  // Listen on the specified port and log a message when the server starts
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});

// Call the startServer function to initiate the server
startServer();
