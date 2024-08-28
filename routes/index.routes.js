const express = require("express");
const router = express.Router(); // Use express.Router() to create a new router instance

const verifyToken = require("../middleware/authVerify"); // Import the token verification middleware
const authRoutes = require("./auth.routes"); // Import the authentication routes
const productRoutes = require("./product.routes"); // Import the product routes

// Mount the authentication routes at the '/auth' path
router.use("/auth", authRoutes);

// Apply the token verification middleware to all routes that come after this line
router.use(verifyToken);

// Mount the product routes at the '/product' path
router.use("/product", productRoutes);

// Export the router to be used in other parts of the application
module.exports = router;
