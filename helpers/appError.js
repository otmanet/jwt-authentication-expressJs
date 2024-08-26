// Define the appError class which extends the built-in Error class
class appError extends Error {
  // The constructor takes two parameters: message and statusCode
  constructor(message, statusCode) {
    // Call the parent Error constructor with the provided message
    super(message);

    // Assign the statusCode to an instance variable
    this.statusCode = statusCode;

    // Determine the status based on the statusCode
    // If the statusCode starts with '4', it's a client-side error (Fail), otherwise it's a server-side error (Error)
    this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error";

    // Capture the stack trace for this error, excluding the constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}

// Export the appError class for use in other files
module.exports = appError;
