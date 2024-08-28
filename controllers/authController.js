const asyncHandler = require("express-async-handler");
const objectId = require("mongoose").Types.objectId;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../models/User");
const login = asyncHandler(async (req, res) => {
  const { userName, passWord } = req.body;
});

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, userName, password, email } = req.body;

  // Find a user by username and email
  const findUser = await User.findOne({
    $or: [{ username: userName }, { email: email }],
  });

  if (findUser) {
    // Return a 400 status with a message if the user already exists
    return res.status(400).json({
      message: "User already exists",
    });
  }
  // Create a new instance of the User model using the data from the request body
  const objectUser = new User({ ...req.body });

  // Save the user to the database
  objectUser
    .save()
    .then(() => {
      // Generate a JWT token after successfully saving the user
      const token = jwt.sign(
        {
          email: objectUser.email, // Use properties from the saved user object
          username: objectUser.username,
          firstName: objectUser.firstName,
          lastName: objectUser.lastName,
        },
        process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token
        {
          expiresIn: process.env.EXPIRATION_TOKEN, // Set the expiration time for the token
        }
      );

      // Send the token in the response
      res.status(201).json({
        message: "Account created successfully",
        token: token,
      });
    })
    .catch((err) => {
      // Handle any errors that occur during user creation
      res.status(400).json({
        message:
          "Something went wrong while creating a new account. Please try again later.",
        error: err.message, // Optionally include the error message for debugging purposes
      });
    });
});

module.exports = {
  login,
  register,
};
