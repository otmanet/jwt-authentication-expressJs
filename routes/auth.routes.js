// Import the Router class from Express to create a new router instance
const router = require("express").Router();

// Import the login and register functions from the authController module
const { login, register } = require("../controllers/authController");

// Define a route for the "/login" path that handles POST requests with the login function
router.route("/login").post(login);

// Define a route for the "/register" path that handles POST requests with the register function
router.route("/register").post(register);

// Export the router instance to be used in other parts of the application
module.exports = router;
