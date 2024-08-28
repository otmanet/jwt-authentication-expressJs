// Import the getAllProduct function from the productController module
const { getAllProduct } = require("../controllers/productController");

// Create an Express router instance
const router = require("express").Router();

// Define a route for the root path ("/") and associate it with the GET method
// When a GET request is made to "/", the getAllProduct function will be called
router.route("/").get(getAllProduct);

// Export the router so it can be used in other parts of the application
module.exports = router;
