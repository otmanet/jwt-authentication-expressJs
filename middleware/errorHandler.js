// Import the appError class from the helpers directory
const appError = require("../helpers/appError");

// Define the errorHandler middleware function
const errorHandler = (err, req, res, next) => {
  // Check if the error is an instance of appError (a custom error)
  if (err instanceof appError) {
    // If the error is operational (i.e., known and expected), send a response with the specific status and message
    if (err.isOperational) {
      res
        .status(err.statusCode) // Set the HTTP status code based on the error
        .json({ Status: err.status, message: err.message }); // Send the error status and message in the response
    } else {
      // If the error is not operational (i.e., an unexpected server error), log it and send a generic response
      console.error("Something went wrong in server:", err); // Log the error for debugging
      res
        .status(500) // Set the HTTP status code to 500 (Internal Server Error)
        .json({ status: "error", message: "Something went wrong in server" }); // Send a generic error message
    }
  } else {
    // If the error is not an instance of appError, handle it as a general error

    // Determine the status based on the HTTP status code
    const status = `${res.statusCode}`.startsWith("4") ? "Fail" : "Error";

    // If the response status code is 200 (OK), change it to 500 (Internal Server Error)
    res.status(res.statusCode === 200 ? 500 : res.statusCode);

    // Send the error status and message in the response
    res.json({ status: status, message: err.message });
  }
};

// Export the errorHandler middleware for use in other parts of the application
module.exports = { errorHandler };
