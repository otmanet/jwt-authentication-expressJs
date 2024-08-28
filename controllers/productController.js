// Import the express-async-handler module to handle async errors in Express routes
const asyncHandler = require("express-async-handler");

// Define an async function to handle the GET request for all products
const getAllProduct = asyncHandler(async (req, res) => {
  // Extract the user object from the request, which might have been added by middleware
  const user = req.user;

  // Return a JSON response with the user's information and a list of products
  return res.status(200).json({
    client: `${user.firstName} ${user.lastName}`, // Client's full name
    email: `${user.email}`, // Client's email address
    product: ["keyboard", "phone", "mouse"], // List of products
  });
});

// Export the getAllProduct function for use in other parts of the application
module.exports = {
  getAllProduct,
};
