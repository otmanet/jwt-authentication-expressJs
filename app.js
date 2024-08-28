// Import the Express module to create the application server
const express = require("express");

// Import cookie-parser middleware to parse cookies in requests
const cookieParser = require("cookie-parser");

// Import the index routes and error handler middleware
const indexRoutes = require("./routes/index.routes.js");
const { errorHandler } = require("./middleware/errorHandler.js");

// Create an instance of an Express application
const app = express();

// Use cookieParser middleware to handle cookies in incoming requests
app.use(cookieParser());

// Middleware to parse incoming JSON requests and make the data available in req.body
app.use(express.json());

// Middleware to parse URL-encoded data from the request body, with `extended` set to `false` to use the querystring library
app.use(express.urlencoded({ extended: false }));

// Disable the 'X-Powered-By' header in the HTTP response
app.disable("x-powered-by");

// Use the index routes for any requests that start with "/api"
app.use("/api", indexRoutes);

// Define a fallback route for "/api" that returns a 404 status and a "Not found" message
app.use("/api", (_, res) => {
  res.status(404).json({ status: "fail", message: "Not found" });
});

// Use the custom error handler middleware to catch and handle errors globally
app.use(errorHandler);

// Export the Express app instance so it can be used in other parts of the application, such as in server setup
module.exports = app;
